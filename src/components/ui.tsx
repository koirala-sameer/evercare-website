import React from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * Backward-compatible Button:
 * - By default keeps the same appearance you already had (primary/solid).
 * - Adds variant & size options for site-wide consistency.
 */
export function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold rounded-2xl transition ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed'

  const lift = 'hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0'
  const sizes: Record<ButtonSize, string> = {
    default: 'px-5 py-2.5 text-sm',
    sm: 'px-3.5 py-2 text-sm',
    lg: 'px-5 py-3 text-base',
  }

  const variants: Record<ButtonVariant, string> = {
    // Matches your previous Button styling (solid brand)
    primary: cn('bg-brand-teal text-white shadow-soft', lift),
    // Brand outline for secondary actions
    outline:
      'border border-brand-teal text-brand-teal bg-white hover:bg-brand-teal/10 shadow-soft',
    // Subtle/tertiary action
    ghost: 'text-brand-teal hover:bg-brand-teal/10',
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  )
}

/**
 * Backward-compatible GhostButton:
 * - Keeps the old look, now implemented via the outline variant.
 * - Existing imports won’t break.
 */
export function GhostButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      variant="outline"
      className={cn('border-slate-300 text-slate-700', className)}
      {...(props as ButtonProps)}
    />
  )
}

/** Unchanged */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('rounded-3xl border border-slate-200 bg-white p-6 shadow-soft', className)}
      {...props}
    />
  )
}

/** Unchanged */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">
      {children}
    </span>
  )
}
