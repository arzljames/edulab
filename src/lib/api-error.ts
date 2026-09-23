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
  if (error instanceof z.ZodError) {
    return { status: null, message: FALLBACK_MESSAGE, code: 'INVALID_RESPONSE' }
  }
  // Never show raw internal error messages to users.
  return { status: null, message: FALLBACK_MESSAGE }
}

/** Parse an API response with Zod, throwing a normalized ApiError on mismatch. */
export function parseResponse<T extends z.ZodTypeAny>(schema: T, data: unknown): z.output<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    if (import.meta.env.DEV) console.error('API response failed validation', result.error)
    throw toApiError(result.error)
  }
  return result.data
}
