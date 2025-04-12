import { Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'
import {
  activeUsersQueryOptions,
  chatQueryOptions,
  initPresence,
  monitorUsers,
  roomQueryOptions,
  gamesQueryOptions,
  gameQueryOptions
} from './-utils'
import { LoaderPinwheelIcon } from 'lucide-react'

export const Route = createFileRoute('/app/room/$id')({
  loader: async ({ context: { queryClient }, params: { id } }) => {
    await Promise.all([
      queryClient.ensureQueryData(roomQueryOptions(id)),
      queryClient.ensureQueryData(chatQueryOptions(id)),
      queryClient.ensureQueryData(activeUsersQueryOptions(id)),
      queryClient.ensureQueryData(gamesQueryOptions(id)),
      queryClient.ensureQueryData(gameQueryOptions(id)),
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
  monitorUsers()

  return <Outlet />
}
