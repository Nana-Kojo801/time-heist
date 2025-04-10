import { v } from 'convex/values'
import { query } from './_generated/server'

export const get = query({
  args: { userId: v.id('users') },
  handler: async (ctx, { userId }) => {
    return await ctx.db
      .query('gamesHistory')
      .filter((q) => q.eq(q.field('userId'), userId))
      .collect()
  },
})
