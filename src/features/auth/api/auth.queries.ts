import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../stores/auth.store'
import { login } from './auth.api'

export const authKeys = {
  all: ['auth'] as const,
}

export function useLoginMutation() {
  const setSession = useAuthStore((state) => state.setSession)
  return useMutation({
    mutationKey: [...authKeys.all, 'login'],
    mutationFn: login,
    onSuccess: ({ accessToken, user }) => setSession({ accessToken, user }),
  })
}
