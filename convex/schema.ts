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
    state: v.union(v.literal("idle"), v.literal("playing")),
    members: v.array(
      v.object({
        userId: v.id('users'),
        username: v.string(),
        avatar: v.string(),
        role: v.string(),
        ready: v.boolean(),
        lastActive: v.number()
      }),
    ),
    gameSettings: v.object({
      minutes: v.number(),
      seconds: v.number(),
      milliseconds: v.number(),
    })
  })
    .searchIndex('search_name', {
      searchField: 'name',
    })
    .searchIndex('search_code', {
      searchField: 'code',
    }),
  games: defineTable({
    roomId: v.id('rooms'),
    startTime: v.number(),
    state: v.union(v.literal("waiting"), v.literal("playing"), v.literal("finished")),
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
  roomChats: defineTable({
    roomId: v.id("rooms"),
    userId: v.id("users"),
    message: v.string()
  })
})
