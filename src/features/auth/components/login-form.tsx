import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { ApiError } from '@/lib/api-error'
import { cn } from '@/lib/utils'
import { useLoginMutation } from '../api/auth.queries'
import { loginFormDefaults, loginFormSchema } from '../schemas/login.schema'
import type { LoginFormValues } from '../types'

const inputClassName =
  'h-12 rounded-xl border-foreground/45 bg-background px-4 text-base md:text-sm dark:border-input'
const linkClassName =
  'rounded-sm font-medium underline underline-offset-4 hover:text-primary'

function loginErrorMessage(error: ApiError): string {
  if (error.status === 401) {
    return 'That email and password don’t match. Check them and try again.'
  }
  return error.message
}

export type LoginFormProps = {
  onSuccess: () => void
  className?: string
}

export function LoginForm({ onSuccess, className }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const loginMutation = useLoginMutation()
  // Stay busy through the post-login navigation so the form can’t be resubmitted.
  const isBusy = loginMutation.isPending || loginMutation.isSuccess
  const hasFieldErrors = Boolean(
    loginMutation.error?.fieldErrors?.email || loginMutation.error?.fieldErrors?.password,
  )
  const form = useForm<z.input<typeof loginFormSchema>, unknown, LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginFormDefaults,
    mode: 'onTouched',
  })

  const onSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values, {
      onSuccess,
      onError: (error) => {
        for (const field of ['email', 'password'] as const) {
          const message = error.fieldErrors?.[field]?.[0]
          if (message) form.setError(field, { message })
        }
      },
    })
  }

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex flex-col gap-6', className)}
    >
      <FieldGroup className="gap-5">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email" className="font-semibold">Email address</FieldLabel>
              <Input
                {...field}
                id="login-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@school.edu"
                required
                aria-invalid={fieldState.invalid}
                aria-describedby={fieldState.invalid ? 'login-email-error' : undefined}
                className={inputClassName}
              />
              {fieldState.invalid && (
                <FieldError id="login-email-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between gap-2">
                <FieldLabel htmlFor="login-password" className="font-semibold">Password</FieldLabel>
                <Link
                  to="/forgot-password"
                  className="rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  {...field}
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  required
                  aria-invalid={fieldState.invalid}
                  aria-describedby={fieldState.invalid ? 'login-password-error' : undefined}
                  className={cn(inputClassName, 'pr-12')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((shown) => !shown)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {showPassword ? (
                    <EyeOff aria-hidden="true" className="size-4" />
                  ) : (
                    <Eye aria-hidden="true" className="size-4" />
                  )}
                </button>
              </div>
              {fieldState.invalid && (
                <FieldError id="login-password-error" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        <Controller
          name="rememberMe"
          control={form.control}
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="login-remember"
                className="border-foreground/45 bg-background dark:border-input"
                name={field.name}
                ref={field.ref}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
                onBlur={field.onBlur}
              />
              <FieldLabel htmlFor="login-remember" className="font-normal">
                Keep me signed in
              </FieldLabel>
            </Field>
          )}
        />
      </FieldGroup>

      {loginMutation.isError && !hasFieldErrors && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {loginErrorMessage(loginMutation.error)}
        </div>
      )}

      <Button
        type="submit"
        disabled={isBusy}
        className="h-12 w-full rounded-full text-base"
      >
        {isBusy && <Loader2 aria-hidden="true" className="animate-spin" />}
        {isBusy ? 'Logging in…' : 'Log in'}
      </Button>

      <p className="text-sm text-muted-foreground">
        New to EduLab?{' '}
        <Link to="/register" className={cn(linkClassName, 'text-foreground')}>
          Sign up
        </Link>
      </p>

      <p className="text-xs leading-relaxed text-muted-foreground">
        By continuing you agree to EduLab’s{' '}
        <Link to="/terms" className={linkClassName}>
          Terms
        </Link>{' '}
        and{' '}
        <Link to="/privacy" className={linkClassName}>
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  )
}
