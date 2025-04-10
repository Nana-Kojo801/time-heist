import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    const [messages, room] = await Promise.all([
      ctx.db
        .query('roomChats')
        .filter((q) => q.eq(q.field('roomId'), roomId))
        .order('asc')
        .collect(),
      ctx.db.get(roomId),
    ])

    return await Promise.all(
      messages.map(async (message) => {
        const user = room!.members.find(
          (member) => member.userId === message.userId,
        )!
        return {
          ...message,
          username: user.username,
          avatar: user.avatar,
          role: user.role,
        }
      }),
    )
  },
})

export const insert = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('roomChats', args)
  },
})
