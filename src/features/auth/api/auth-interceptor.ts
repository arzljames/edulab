import { api } from '@/lib/axios'
import { useAuthStore } from '../stores/auth.store'

let installed = false

/** Attaches the in-memory access token to every API request. Call once at startup. */
export function installAuthInterceptor() {
  if (installed) return
  installed = true
  api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })
}
