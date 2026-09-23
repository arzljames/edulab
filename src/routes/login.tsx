import { createFileRoute } from '@tanstack/react-router'
import { zodValidator } from '@tanstack/zod-adapter'
import { LoginPage, loginSearchSchema } from '@/features/auth'

export const Route = createFileRoute('/login')({
  validateSearch: zodValidator(loginSearchSchema),
  head: () => ({ meta: [{ title: 'Log in · EduLab' }] }),
  component: LoginPage,
})
