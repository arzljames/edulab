import { fallback } from '@tanstack/zod-adapter'
import { z } from 'zod'

export const loginSearchSchema = z.object({
  redirect: fallback(z.string(), '/').default('/'),
})
