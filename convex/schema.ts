import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    username: v.string(),
    password: v.string(),
    avatar: v.string(),
  }),
  gamesHistory: defineTable({
    userId: v.id('users'),
    date: v.string(),
    role: v.string(),
    score: v.number(),
    accuracy: v.float64(),
    status: v.string(),
  }),
  rooms: defineTable({
    name: v.string(),
    code: v.string(),
    private: v.boolean(),
    password: v.optional(v.string()),
    ownerId: v.id('users'),
    members: v.array(
      v.object({
        userId: v.id('users'),
        username: v.string(),
        avatar: v.string(),
        role: v.string(),
        ready: v.boolean(),
        status: v.union(v.literal("active"), v.literal("inactive")),
        lastActive: v.number()
      }),
    ),
  })
    .searchIndex('search_name', {
      searchField: 'name',
    })
    .searchIndex('search_code', {
      searchField: 'code',
    }),
  games: defineTable({
    roomId: v.id('rooms'),
    timer: v.string(),
    startTime: v.string(),
    timeWindows: v.array(v.string()),
    players: v.array(
      v.object({
        userId: v.id('users'),
        score: v.number(),
        hits: v.array(
          v.object({
            timeWindow: v.string(),
            accuracy: v.float64(),
            status: v.string(),
          }),
        ),
      }),
    ),
  }),
  presences: defineTable({
    userId: v.id('users'),
    roomId: v.id('rooms'),
    updated: v.number(),
  }),
  roomChats: defineTable({
    roomId: v.id("rooms"),
    userId: v.id("users"),
    message: v.string()
  })
})
