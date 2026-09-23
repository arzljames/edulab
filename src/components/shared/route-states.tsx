import { useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { toApiError } from '@/lib/api-error'

export function DefaultPending() {
  return (
    <div role="status" aria-live="polite" className="p-6 text-muted-foreground">
      Loading…
    </div>
  )
}

export function DefaultError({ error }: ErrorComponentProps) {
  const router = useRouter()
  return (
    <div role="alert" className="flex flex-col items-start gap-3 p-6">
      <h1 className="text-lg font-semibold">Something went wrong</h1>
      <p className="text-muted-foreground">{toApiError(error).message}</p>
      <Button onClick={() => router.invalidate()}>Try again</Button>
    </div>
  )
}

export function DefaultNotFound() {
  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold">Page not found</h1>
      <p className="text-muted-foreground">We couldn’t find the page you were looking for.</p>
    </div>
  )
}
