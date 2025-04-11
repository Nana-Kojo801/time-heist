import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { api } from './_generated/api'

const roles = ['Leader', 'Lookout', 'Technician', 'Safecracker']

export const create = mutation({
  args: {
    ownerId: v.id('users'),
    username: v.string(),
    avatar: v.string(),
    name: v.string(),
    private: v.boolean(),
    password: v.optional(v.string()),
  },
  handler: async (ctx, { username, avatar, ...rest }) => {
    const roomCode = Math.random().toString(36).slice(2, 8).toUpperCase()
    const roomId = await ctx.db.insert('rooms', {
      ...rest,
      code: roomCode,
      members: [
        {
          userId: rest.ownerId,
          ready: false,
          role: 'Leader',
          username,
          avatar,
          status: 'active',
          lastActive: Date.now(),
        },
      ],
    })
    return { roomCode, roomId }
  },
})

export const get = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    return await ctx.db.get(roomId)
  },
})

export const getActiveUsers = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    const activeThreshold = Date.now() - 20000

    const room = (await ctx.db.get(roomId))!

    return room.members.filter((member) => {
      return member.lastActive > activeThreshold
    })
  },
})

export const updateStatus = mutation({
  args: {
    status: v.union(v.literal('active'), v.literal('inactive')),
    roomId: v.id('rooms'),
    userId: v.id('users'),
  },
  handler: async (ctx, { roomId, userId, ...rest }) => {
    const room = (await ctx.db.get(roomId))!
    await ctx.db.patch(roomId, {
      members: room.members.map((member) =>
        member.userId === userId
          ? { ...member, ...rest, lastActive: Date.now() }
          : member,
      ),
    })
  },
})

export const monitorUsersStatus = mutation({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    const room = (await ctx.db.get(roomId))!
    const activeThreshold = Date.now() - 20000
    const notifications = await ctx.db
      .query('roomNotifications')
      .filter((q) => q.eq(q.field('roomId'), roomId))
      .collect()
    const disconnectedNotifications = notifications.filter(
      (notification) => notification.type === 'disconnected',
    )

    room.members.forEach(async (member) => {
      if (
        member.lastActive < activeThreshold &&
        !disconnectedNotifications.some(
          (notification) => notification.userId === member.userId,
        )
      ) {
        await Promise.all([
          ctx.db.patch(roomId, {
            members: room.members.map((m) =>
              m.userId === member.userId
                ? { ...m, status: 'inactive' as 'inactive' | 'active' }
                : m,
            ),
          }),
          ctx.runMutation(api.roomNotifications.insert, {
            roomId,
            userId: member.userId,
            message: `${member.username} has disconnected`,
            type: 'disconnected',
          }),
        ])
      }
    })
  },
})

export const handleReconnect = mutation({
  args: { roomId: v.id('rooms'), userId: v.id('users') },
  handler: async (ctx, { roomId, userId }) => {
    const [notifications, room] = await Promise.all([
      ctx.db
        .query('roomNotifications')
        .filter((q) => q.eq(q.field('roomId'), roomId))
        .collect(),
      ctx.db.get(roomId),
    ])

    const user = room!.members.find((member) => member.userId === userId)!

    const deleteOperations = notifications
      .filter(
        (notification) =>
          notification.type === 'disconnected' &&
          notification.userId === userId,
      )
      .map((notification) => ctx.db.delete(notification._id))

    await Promise.all(deleteOperations)

    // 3. Single atomic update for member status
    const updatedMembers = room!.members.map((m) =>
      m.userId === userId
        ? {
            ...m,
            status: 'active' as const,
            lastActive: Date.now(),
          }
        : m,
    )
    if (user.status === 'inactive') {
      await ctx.db.insert('roomNotifications', {
        roomId,
        userId: user.userId,
        message: `${user.username} has reconnected`,
        type: 'reconnected',
      })
    }

    await ctx.db.patch(roomId, {
      members: updatedMembers,
    })
  },
})

export const searchRoom = query({
  args: { roomName: v.string() },
  handler: async (ctx, { roomName }) => {
    if (roomName === '') return await ctx.db.query('rooms').collect()
    return await ctx.db
      .query('rooms')
      .withSearchIndex('search_name', (q) => q.search('name', roomName))
      .collect()
  },
})

export const joinRoom = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
    username: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, { roomId, userId, username, avatar }) => {
    const room = await ctx.db.get(roomId)
    if (!room) throw Error('Room does not exists')
    if (room.members.length >= 4) throw Error('Room is full')
    if (room.members.find((member) => member.userId === userId)) return
    const role = roles.filter(
      (role) => !room.members.map((member) => member.role).includes(role),
    )[0]
    await ctx.db.patch(roomId, {
      members: [
        ...room.members,
        {
          username,
          userId,
          ready: false,
          role,
          avatar,
          status: 'active',
          lastActive: Date.now(),
        },
      ],
    })
  },
})

export const joinRoomWithCode = mutation({
  args: {
    roomCode: v.string(),
    userId: v.id('users'),
    username: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, { roomCode, ...rest }) => {
    const room = await ctx.db
      .query('rooms')
      .filter((q) => q.eq(q.field('code'), roomCode))
      .first()
    if (!room) throw Error(`Room with code ${roomCode} does not exist`)
    await ctx.runMutation(api.rooms.joinRoom, { ...rest, roomId: room._id })
    return room._id
  },
})

export const leaveRoom = mutation({
  args: { roomId: v.id('rooms'), userId: v.id('users') },
  handler: async (ctx, { roomId, userId }) => {
    const room = (await ctx.db.get(roomId))!
    const user = room.members.find((member) => member.userId === userId)!
    await Promise.all([
      ctx.db.insert('roomNotifications', {
        message: `${user.username} has left`,
        type: 'leave',
        roomId,
        userId,
      }),
      ctx.db.patch(roomId, {
        members: room.members.filter((member) => member.userId !== userId),
      }),
    ])
  },
})

export const updateUserRole = mutation({
  args: { roomId: v.id('rooms'), userId: v.id('users'), role: v.string() },
  handler: async (ctx, { roomId, userId, role }) => {
    const room = (await ctx.db.get(roomId))!

    await ctx.db.patch(room._id, {
      members: room.members.map((member) =>
        member.userId === userId ? { ...member, role } : member,
      ),
    })
  },
})
