import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRootRouteWithContext, HeadContent, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { RouterContext } from '@/app/router-context'
import { useRouteFocus } from '@/app/use-route-focus'
import { DefaultError, DefaultNotFound, DefaultPending } from '@/components/shared/route-states'

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => ({ meta: [{ title: 'EduLab' }] }),
  component: RootLayout,
  pendingComponent: DefaultPending,
  errorComponent: DefaultError,
  notFoundComponent: DefaultNotFound,
})

function RootLayout() {
  useRouteFocus()

  return (
    <>
      <HeadContent />
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
