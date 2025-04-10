import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { convexQueryClient } from '../convex/provider'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn()
    }
  }
})

convexQueryClient.connect(queryClient)

export function getContext() {
  return {
    queryClient,
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
