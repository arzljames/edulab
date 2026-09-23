import { create } from 'zustand'
import type { User } from '../types'

type Session = { accessToken: string; user: User }

type AuthState = {
  accessToken: string | null
  user: User | null
  setSession: (session: Session) => void
  clearSession: () => void
}

// Kept in memory only. "Keep me signed in" is sent to the backend, which
// decides how long the httpOnly refresh cookie lives.
export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  user: null,
  setSession: ({ accessToken, user }) => set({ accessToken, user }),
  clearSession: () => set({ accessToken: null, user: null }),
}))

export const useCurrentUser = () => useAuthStore((state) => state.user)
export const useIsAuthenticated = () => useAuthStore((state) => state.accessToken !== null)
