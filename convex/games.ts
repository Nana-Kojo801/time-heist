import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getGame = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    const room = (await ctx.db.get(roomId))!
    const games = await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('roomId'), roomId))
      .order('desc')
      .collect()
    if (games.length === 0) {
      return null
    }
    const game = games[0]
    const players = await Promise.all(game.players.map(async player => {
      const user = room.members.find(member => member.userId === player.userId)!
      return {
        ...player,
        username: user.username,
        avatar: user.avatar,
        role: user.role
      }
    }))
    return { ...game, players }
  },
})

export const getGames = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    return await ctx.db
      .query('games')
      .filter((q) => q.eq(q.field('roomId'), roomId))
      .order('desc')
      .collect()
  },
})

export const create = mutation({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    const room = (await ctx.db.get(roomId))!
    const id = await ctx.db.insert('games', {
      roomId,
      startTime: Date.now(),
      timeWindows: [],
      players: room.members.map(member => ({
        userId: member.userId,
        score: 0,
        hits: []
      })),
      state: 'waiting',
    })
    await ctx.db.patch(roomId, { state: 'playing' })
    return id
  },
})
