import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/shared/coming-soon'

export const Route = createFileRoute('/forgot-password')({
  head: () => ({ meta: [{ title: 'Reset your password · EduLab' }] }),
  component: () => <ComingSoon title="Reset your password" />,
})
