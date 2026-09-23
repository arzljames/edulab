import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'

export type BrandLogoProps = {
  /** `onDark` for dark surfaces such as the auth brand panel. */
  tone?: 'onLight' | 'onDark'
  className?: string
}

export function BrandLogo({ tone = 'onLight', className }: BrandLogoProps) {
  return (
    <Link
      to="/"
      className={cn(
        'inline-flex items-center gap-2.5 rounded-lg font-heading text-xl font-semibold tracking-tight outline-offset-4',
        tone === 'onDark' ? 'text-ink-foreground' : 'text-foreground',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'grid size-8 place-items-center rounded-lg pb-0.5 text-xl leading-none font-bold',
          tone === 'onDark' ? 'bg-ink-foreground text-ink' : 'bg-ink text-ink-foreground',
        )}
      >
        e
      </span>
      EduLab
    </Link>
  )
}
