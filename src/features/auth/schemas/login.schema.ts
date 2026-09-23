import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Enter your email address.')
    .email('Enter a valid email address, like you@school.edu.'),
  password: z.string().min(1, 'Enter your password.'),
  rememberMe: z.boolean(),
})

export const loginFormDefaults: z.input<typeof loginFormSchema> = {
  email: '',
  password: '',
  rememberMe: false,
}
