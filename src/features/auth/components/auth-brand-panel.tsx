import { Sparkles } from 'lucide-react'
import { BrandLogo } from '@/components/shared/brand-logo'

export function AuthBrandPanel() {
  return (
    <aside
      aria-label="About EduLab"
      className="relative hidden flex-col justify-between overflow-hidden bg-ink p-10 text-ink-foreground lg:flex"
    >
      {/* Decorative shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-[14%] -right-12 h-44 w-52 rotate-[-8deg] rounded-3xl bg-white/10" />
        <div className="absolute -bottom-16 -left-20 h-[52%] w-[70%] rotate-[-6deg] rounded-[2.5rem] bg-primary/25" />
      </div>

      <BrandLogo tone="onDark" className="relative self-start" />

      <div className="relative max-w-md">
        <p className="font-heading text-[2.75rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
          Teaching gets better when it’s shared.
        </p>
        <p className="mt-4 text-base leading-relaxed text-ink-foreground/75">
          Join a library of lesson plans, worksheets, and activities built by teachers, then
          adapted by AI to fit your classroom.
        </p>
      </div>

      <div className="relative flex max-w-xs items-center gap-3 rounded-xl bg-white/10 p-3 text-sm backdrop-blur-sm">
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-lg bg-white/10"
        >
          <Sparkles className="size-4" />
        </span>
        A growing library of resources shared by teachers like you
      </div>
    </aside>
  )
}
