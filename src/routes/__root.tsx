import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { RouterContext } from '@/app/router-context'
import { DefaultError, DefaultNotFound, DefaultPending } from '@/components/shared/route-states'

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  pendingComponent: DefaultPending,
  errorComponent: DefaultError,
  notFoundComponent: DefaultNotFound,
})

function RootLayout() {
  return (
    <>
      <Outlet />
      {import.meta.env.DEV && (
        <>
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <TanStackRouterDevtools position="bottom-right" />
        </>
      )}
    </>
  )
}
