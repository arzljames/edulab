import type { ReactNode } from 'react'
import { BrandLogo } from '@/components/shared/brand-logo'
import { AuthBrandPanel } from './auth-brand-panel'

export type AuthSplitLayoutProps = { children: ReactNode }

export function AuthSplitLayout({ children }: AuthSplitLayoutProps) {
  return (
    <div className="grid min-h-svh bg-canvas lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <AuthBrandPanel />
      <main className="flex flex-col px-4 py-8 sm:px-8">
        <BrandLogo className="self-start lg:hidden" />
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </main>
    </div>
  )
}
