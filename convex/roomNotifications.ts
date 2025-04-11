import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { api } from './_generated/api'

export const get = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, { roomId }) => {
    return await ctx.db
      .query('roomNotifications')
      .filter((q) => q.eq(q.field('roomId'), roomId))
      .collect()
  },
})

export const insert = mutation({
  args: {
    roomId: v.id('rooms'),
    userId: v.id('users'),
    message: v.string(),
    type: v.union(
      v.literal('reconnected'),
      v.literal('disconnected'),
      v.literal('leave'),
    ),
  },
  handler: async (ctx, args) => {
    const alreadyExists = (
      await ctx.runQuery(api.roomNotifications.get, {
        roomId: args.roomId,
      })
    ).some(
      (notification) =>
        notification.userId === args.userId && notification.type === args.type,
    )
    if (alreadyExists) return
    const id = await ctx.db.insert('roomNotifications', args)
    await ctx.scheduler.runAfter(5000, api.roomNotifications.remove, {
      id,
    })
  },
})

export const remove = mutation({
  args: { id: v.id('roomNotifications') },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id)
  },
})
