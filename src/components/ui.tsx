import React from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'outline' | 'ghost'
type ButtonSize = 'default' | 'sm' | 'lg'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

/**
 * Unified modern button system with sharper, premium styling.
 */
export function Button({
  className,
  variant = 'primary',
  size = 'default',
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-150 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9384]/60 focus-visible:ring-offset-2 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed rounded-xl'

  const sizes: Record<ButtonSize, string> = {
    default: 'px-5 py-2.5 text-sm md:text-base',
    sm: 'px-3.5 py-1.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  const variants: Record<ButtonVariant, string> = {
    primary:
      // Gradient + subtle lift
      'bg-gradient-to-r from-[#0E9384] to-[#0C7C6F] text-white shadow-sm hover:shadow-md hover:brightness-110 active:brightness-95',
    outline:
      // Sharp outline with subtle translucent hover
      'border border-[#0E9384]/80 text-[#0E9384] bg-white hover:bg-[#E8F5F3] hover:shadow-sm active:bg-[#DFF4EF]',
    ghost:
      // Minimal ghost button
      'text-[#0E9384] hover:bg-[#E8F5F3] active:bg-[#DFF4EF]',
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  )
}

/** Keeps backward compatibility */
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

/** Card container */
export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-200',
        className
      )}
      {...props}
    />
  )
}

/** Badge */
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#0E9384]/10 px-3 py-1 text-xs font-medium text-[#0E9384]">
      {children}
    </span>
  )
}
