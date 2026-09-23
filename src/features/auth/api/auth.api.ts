import { parseResponse } from '@/lib/api-error'
import { api } from '@/lib/axios'
import { loginResponseSchema } from '../schemas/session.schema'
import type { LoginFormValues, LoginResponse } from '../types'
import { authEndpoints } from './endpoints'

export async function login(values: LoginFormValues): Promise<LoginResponse> {
  const { data } = await api.post<unknown>(authEndpoints.login, values)
  return parseResponse(loginResponseSchema, data)
}
