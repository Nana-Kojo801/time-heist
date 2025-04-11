import { useAuthUser } from '@/components/auth-provider'
import { convexQuery, useConvex } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import type { Id } from '@convex/_generated/dataModel'
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useMutation } from 'convex/react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

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
    ...convexQuery(api.rooms.getActiveUsers, {
      roomId: roomId as Id<'rooms'>,
    }),
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  })
}

export const roomNotificationsQueryOptions = (roomId: string) => {
  return queryOptions({
    ...convexQuery(api.roomNotifications.get, {
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
  const updateStatus = useMutation(api.rooms.updateStatus)
  const online = useConnectionStatus()
  
  useEffect(() => {
    const interval = setInterval(() => {
      updateStatus({
        status: online ? 'active' : 'inactive',
        roomId: roomId as Id<'rooms'>,
        userId: user.userId,
      })
    }, 5000)
    return () => clearInterval(interval)
  }, [])
}

export const manageNotifications = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const { data: notifications } = useSuspenseQuery(
    roomNotificationsQueryOptions(id),
  )

  useEffect(() => {
    if (notifications.length === 0) return
    const notification = notifications[notifications.length - 1]
    toast.message(notification.message, { duration: 1000 })
  }, [notifications])
}


export const monitorUsersStatus = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const monitor = useMutation(api.rooms.monitorUsersStatus)
  useEffect(() => {
    const interval = setInterval(() => {
      monitor({ roomId: id as Id<'rooms'> })
    }, 5000)

    return () => clearInterval(interval)
  }, [])
}

export const handleReconnection = () => {
  const { id } = useParams({ from: '/app/room/$id' })
  const user = useRoomUser()
  const online = useConnectionStatus()
  const handleReconnect = useMutation(api.rooms.handleReconnect)

  useEffect(() => {
    const handleOnline = () => {
      console.log('handling reconnection');
      handleReconnect({ roomId: id as Id<'rooms'>, userId: user.userId })
    }

    window.addEventListener('online', handleOnline)

    if(online) handleOnline()

    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [])
}