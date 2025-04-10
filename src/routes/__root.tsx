import {
  Outlet,
  createRootRouteWithContext
} from '@tanstack/react-router'

import ConvexProvider from '../integrations/convex/provider'

import type { QueryClient } from '@tanstack/react-query'
import { type IAuthContext } from '@/components/auth-provider'
import { Toaster } from 'sonner'

interface MyRouterContext {
  queryClient: QueryClient
  auth: IAuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => {
    return (
      <>
        <ConvexProvider>
          <Outlet />
          <Toaster />
          {/* <TanStackRouterDevtools /> */}
        </ConvexProvider>
      </>
    )
  }
})
