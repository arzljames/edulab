/**
 * Only allow same-origin targets, so `?redirect=` can't send users off-site.
 * Resolves the URL the way the browser will (which strips tabs/newlines and
 * treats `/\` like `//`), then compares origins instead of string prefixes.
 */
export function toSafeRedirect(target: string | undefined, origin: string): string {
  if (!target?.startsWith('/')) return '/'
  try {
    const url = new URL(target, origin)
    if (url.origin !== origin) return '/'
    return `${url.pathname}${url.search}${url.hash}`
  } catch {
    return '/'
  }
}
