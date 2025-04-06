import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'

import ConvexProvider from '../integrations/convex/provider'

import { Provider as TanstackQueryProvider } from '../integrations/tanstack-query/root-provider'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <ConvexProvider>
        <TanstackQueryProvider>
          <Outlet />
        </TanstackQueryProvider>
        {/* <TanStackRouterDevtools /> */}
      </ConvexProvider>
    </>
  ),
})
