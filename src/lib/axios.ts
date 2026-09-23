import axios from 'axios'
import { env } from '@/config/env'
import { toApiError } from '@/lib/api-error'

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

// Auth header + token refresh interceptors are added by the `auth` feature.

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => Promise.reject(toApiError(error)),
)
