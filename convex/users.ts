import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const get = query({
  args: { id: v.id('users') },
  handler: async (ctx, { id }) => {
    return (await ctx.db.get(id))!
  },
})

export const getByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    return await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('username'), username))
      .first()
  },
})

export const insert = mutation({
  args: { username: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert('users', {
      ...args,
      avatar: `https://ui-avatars.com/api/?name=${args.username.charAt(0)}`,
    })
    return (await ctx.db.get(id))!
  },
})

export const updateProfile = mutation({
  args: {
    userId: v.id('users'),
    username: v.string(),
    password: v.string(),
    avatar: v.string(),
  },
  handler: async (ctx, { userId, ...changes }) => {
    await ctx.db.patch(userId, changes)
  },
})

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
