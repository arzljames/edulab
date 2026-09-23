import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/shared/coming-soon'

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [{ title: 'Terms of use · EduLab' }] }),
  component: () => <ComingSoon title="Terms of use" />,
})
