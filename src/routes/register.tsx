import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/shared/coming-soon'

export const Route = createFileRoute('/register')({
  head: () => ({ meta: [{ title: 'Sign up · EduLab' }] }),
  component: () => <ComingSoon title="Sign up" />,
})
