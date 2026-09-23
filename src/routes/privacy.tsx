import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/shared/coming-soon'

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [{ title: 'Privacy policy · EduLab' }] }),
  component: () => <ComingSoon title="Privacy policy" />,
})
