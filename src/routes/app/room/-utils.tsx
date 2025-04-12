import { useAuthUser } from '@/components/auth-provider'
import { convexQuery, useConvex } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import type { Id } from '@convex/_generated/dataModel'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export const roomQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.rooms.get, { roomId: roomId as Id<'rooms'> }),
    gcTime: 5 * 60 * 1000,
  })
}

export const gamesQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.games.getGames, { roomId: roomId as Id<'rooms'> }),
    gcTime: 5 * 60 * 1000,
  })
}

export const chatQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.roomChats.get, { roomId: roomId as Id<'rooms'> }),
    gcTime: 5 * 60 * 1000,
  })
}

export const gameQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.games.getGame, { roomId: roomId as Id<'rooms'> }),
    gcTime: 1 * 60 * 1000,
  })
}


export const activeUsersQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.rooms.getActiveUsers, {
      roomId: roomId as Id<'rooms'>,
    }),
    staleTime: 1000,
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

export const useRoomGames = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const { data: games } = useSuspenseQuery(gamesQueryOptions(id))
  return games
}

export const isActiveUser = (userId: Id<'users'>) => {
  const activeUsers = useActiveUsers()
  return activeUsers.map((user) => user.userId).includes(userId)
}

export const useConnectionStatus = () => {
  const convex = useConvex()
  const [connectionState, setConnectionState] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setConnectionState(convex.connectionState().isWebSocketConnected)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return connectionState
}

export const initPresence = () => {
  const { id: roomId } = useParams({ from: '/app/room/$id' })
  const user = useRoomUser()
  const updateLastActive = useMutation(api.rooms.updateLastActive)

  useEffect(() => {
    const interval = setInterval(() => {
      updateLastActive({
        roomId: roomId as Id<'rooms'>,
        userId: user.userId,
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])
}

export const monitorUsers = () => {
  const room = useRoom()
  const activeUsers = useActiveUsers()
  const previousUsers = useRef<typeof activeUsers>(undefined)
  const previousMembers = useRef<typeof room.members>(undefined)
  const disconnectedUsers = useRef<typeof activeUsers>([])

  useEffect(() => {
    if (!previousUsers.current) {
      previousUsers.current = activeUsers
      return
    }
    const inactiveUsers = previousUsers.current.filter(
      (p1) =>
        !activeUsers.some((p2) => p1.userId === p2.userId) &&
        room.members.some((p3) => p3.userId === p1.userId),
    )

    const reConnectedUsers = disconnectedUsers.current.filter((p1) =>
      activeUsers.some((p2) => p1.userId === p2.userId),
    )

    reConnectedUsers.forEach((user) => {
      toast.message(`${user.username} has reconnected`, { duration: 1000 })
    })

    inactiveUsers.forEach((user) => {
      toast.error(`${user.username} has disconnected`, { duration: 1000 })
      disconnectedUsers.current = [...disconnectedUsers.current, user]
    })

    disconnectedUsers.current = disconnectedUsers.current.filter(
      (p1) => !activeUsers.some((p2) => p2.userId === p1.userId),
    )
    previousUsers.current = activeUsers
  }, [activeUsers])

  useEffect(() => {
    if (!previousMembers.current) {
      previousMembers.current = room.members
      return
    }
    const usersLeft = previousMembers.current.filter(
      (p1) => !room.members.some((p2) => p1.userId === p2.userId),
    )
    const usersJoined = room.members.filter(p1 => !previousMembers.current!.some(p2 => p1.userId === p2.userId))

    usersJoined.forEach((user) => {
      toast.message(`${user.username} has joined the room`, { duration: 1000 })
    })

    usersLeft.forEach((user) => {
      toast.message(`${user.username} has left the room`, { duration: 1000 })
    })

    previousMembers.current = room.members
  }, [room.members])
}
