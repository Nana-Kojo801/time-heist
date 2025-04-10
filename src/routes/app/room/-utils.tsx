import { useAuthUser } from '@/components/auth-provider'
import { convexQuery, useConvex } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import type { DataModel, Id } from '@convex/_generated/dataModel'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useEffect } from 'react'

export const roomQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.rooms.get, { roomId: roomId as Id<'rooms'> }),
    staleTime: 0,
    gcTime: 5 * 60 * 1000,
  })
}

export const chatQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.roomChats.get, { roomId: roomId as Id<'rooms'> }),
    gcTime: 5 * 60 * 1000,
  })
}

export const activeUsersQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.rooms.getActiveUsers, { roomId: roomId as Id<'rooms'> }),
    gcTime: 5 * 60 * 1000,
  })
}


export const useRoom = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const { data: room } = useSuspenseQuery(roomQueryOptions(id))
  return room!
}

export const useRoomUser = () => {
  const user = useAuthUser()
  const room = useRoom()
  return room.members.find((member) => member.userId === user._id)!
}

export const useActiveUsers = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const { data: activeUsers } = useSuspenseQuery(activeUsersQueryOptions(id))
  return activeUsers
}

export const isActiveUser = (userId: Id<"users">) => {
  const activeUsers = useActiveUsers()
  return activeUsers.map(user => user.userId).includes(userId)
}

export const initPresence = () => {
  const { id: roomId } = useParams({ from: '/app/room/$id' })
  const user = useRoomUser()
  const convex = useConvex()
  const updateStatus = useMutation(api.rooms.updateStatus)

  useEffect(() => {
    const interval = setInterval(() => {
      const status = convex.connectionState()
      updateStatus({
        lastActive: Date.now(),
        status: status.isWebSocketConnected ? 'active' : 'inactive',
        roomId: roomId as Id<"rooms">,
        userId: user.userId,
      })
    }, 15000)
    return () => clearInterval(interval)
  }, [])
}
