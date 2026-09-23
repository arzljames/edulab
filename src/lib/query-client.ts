import { QueryClient } from '@tanstack/react-query'
import type { ApiError } from '@/lib/api-error'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: (failureCount, error) => {
        // Don't retry client errors (4xx); retry network/server errors twice.
        if (error.status !== null && error.status >= 400 && error.status < 500) return false
        return failureCount < 2
      },
      refetchOnWindowFocus: false,
    },
  },
})
