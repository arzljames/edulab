import { useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

/**
 * After client-side navigation, move focus to the new page's <main> so
 * keyboard and screen-reader users land at the top of the new content.
 * Skips the initial page load, where the browser already handles focus.
 */
export function useRouteFocus() {
  const router = useRouter()

  useEffect(() => {
    return router.subscribe('onResolved', ({ fromLocation, pathChanged }) => {
      if (!fromLocation || !pathChanged) return
      const main = document.querySelector<HTMLElement>('main')
      if (!main) return
      if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    })
  }, [router])
}
