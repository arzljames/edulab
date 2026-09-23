import { z } from 'zod'

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
})

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
})
