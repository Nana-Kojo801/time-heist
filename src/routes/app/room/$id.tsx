import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import {
  activeUsersQueryOptions,
  chatQueryOptions,
  initPresence,
  isActiveUser,
  roomQueryOptions,
  useActiveUsers,
  useRoomUser,
} from './-utils'
import { LoaderPinwheelIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { toast } from 'sonner'

export const Route = createFileRoute('/app/room/$id')({
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await Promise.all([
      queryClient.ensureQueryData(roomQueryOptions(id)),
      queryClient.ensureQueryData(chatQueryOptions(id)),
      queryClient.ensureQueryData(activeUsersQueryOptions(id)),
    ])
  },
  pendingComponent: () => {
    return (
      <div className="w-screen h-dvh grid place-content-center">
        <LoaderPinwheelIcon className="size-9 text-primary animate-spin" />
      </div>
    )
  },
  component: RouteComponent,
})

function RouteComponent() {
  initPresence()
  const activeUsers = useActiveUsers()
  const previousUsers = useRef<typeof activeUsers>(undefined)

  useEffect(() => {
    if (!activeUsers || !previousUsers.current) {
      previousUsers.current = activeUsers
      return
    }

    // Proper disconnect detection
    const disconnectedUsers = previousUsers.current.filter(
      (p1) => !activeUsers.some((p2) => p2.userId === p1.userId),
    )

    disconnectedUsers.forEach((user) => {
      toast.error(`${user.username} has disconnected`)
    })

    previousUsers.current = activeUsers
  }, [activeUsers])

  return <Outlet />
}
