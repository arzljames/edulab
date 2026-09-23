import { getRouteApi, useRouter } from '@tanstack/react-router'
import { AuthSplitLayout } from '../components/auth-split-layout'
import { LoginForm } from '../components/login-form'
import { toSafeRedirect } from '../utils/safe-redirect'

const routeApi = getRouteApi('/login')

export function LoginPage() {
  const { redirect } = routeApi.useSearch()
  const router = useRouter()

  const handleSuccess = async () => {
    try {
      await router.invalidate()
      // Reading the origin (not navigating with window.location) to validate the target.
      const href = toSafeRedirect(redirect, window.location.origin)
      await router.navigate({ href, replace: true })
    } catch {
      await router.navigate({ to: '/', replace: true })
    }
  }

  return (
    <AuthSplitLayout>
      <h1 className="text-[1.875rem] leading-[1.05] font-semibold tracking-[-0.025em] lg:text-[3.25rem]">
        Welcome back
      </h1>
      <p className="mt-3 text-[0.9375rem] text-muted-foreground">
        Log in to save resources, upload your own, and get AI adaptations.
      </p>
      <LoginForm className="mt-8" onSuccess={handleSuccess} />
    </AuthSplitLayout>
  )
}
