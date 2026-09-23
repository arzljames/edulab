import { isAxiosError } from 'axios'
import { z } from 'zod'

export type ApiError = {
  status: number | null
  message: string
  code?: string
  fieldErrors?: Record<string, string[]>
}

const errorBodySchema = z.object({
  message: z.string().optional(),
  code: z.string().optional(),
  fieldErrors: z.record(z.array(z.string())).optional(),
})

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.'

export function toApiError(error: unknown): ApiError {
  if (isAxiosError(error)) {
    if (!error.response) {
      return {
        status: null,
        message: 'We couldn’t reach the server. Check your connection and try again.',
      }
    }
    const body = errorBodySchema.safeParse(error.response.data)
    return {
      status: error.response.status,
      message: (body.success && body.data.message) || FALLBACK_MESSAGE,
      code: body.success ? body.data.code : undefined,
      fieldErrors: body.success ? body.data.fieldErrors : undefined,
    }
  }
  if (error instanceof Error) {
    return { status: null, message: error.message || FALLBACK_MESSAGE }
  }
  return { status: null, message: FALLBACK_MESSAGE }
}
