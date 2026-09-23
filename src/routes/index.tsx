import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col items-start justify-center gap-4 p-6">
      <h1 className="text-3xl font-semibold">EduLab</h1>
      <p className="text-muted-foreground">
        Share teaching materials and adapt them for every learner.
      </p>
      <Button>Get started</Button>
    </main>
  )
}
