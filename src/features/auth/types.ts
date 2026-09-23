import type { z } from 'zod'
import type { loginFormSchema } from './schemas/login.schema'
import type { loginResponseSchema, userSchema } from './schemas/session.schema'

export type LoginFormValues = z.infer<typeof loginFormSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>
export type User = z.infer<typeof userSchema>
