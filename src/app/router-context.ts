import type { QueryClient } from '@tanstack/react-query'

// `auth` is added here when the auth feature is built.
export type RouterContext = {
  queryClient: QueryClient
}
