import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export type ComingSoonProps = { title: string }

export function ComingSoon({ title }: ComingSoonProps) {
  return (
    <main className="mx-auto flex min-h-svh max-w-md flex-col items-start justify-center gap-4 px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground">This page isn’t ready yet. Check back soon.</p>
      <Button asChild variant="outline">
        <Link to="/">Back to EduLab</Link>
      </Button>
    </main>
  )
}
