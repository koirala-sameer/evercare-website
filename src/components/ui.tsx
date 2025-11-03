import React from 'react'
import { cn } from '../utils/cn'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'premium'
type ButtonSize = 'default' | 'sm' | 'lg' | 'xl'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  sharp?: boolean
}

/**
 * Premium button system with sharper edges and refined styling
 */
export function Button({
  className,
  variant = 'primary',
  size = 'default',
  sharp = false,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9384] focus-visible:ring-offset-1 ' +
    'disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ' +
    (sharp ? 'rounded-lg' : 'rounded-xl')

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-sm tracking-tight',
    default: 'px-6 py-3 text-base tracking-tight',
    lg: 'px-8 py-4 text-lg tracking-tight font-semibold',
    xl: 'px-10 py-5 text-xl tracking-tight font-semibold',
  }

  const variants: Record<ButtonVariant, string> = {
    primary:
      'bg-gradient-to-br from-[#0E9384] to-[#0A7568] text-white ' +
      'shadow-lg hover:shadow-xl hover:shadow-[#0E9384]/25 ' +
      'border border-[#0E9384]/20 ' +
      'hover:brightness-110 hover:scale-[1.02]',
    
    outline:
      'border-2 border-[#0E9384] text-[#0E9384] bg-transparent ' +
      'hover:bg-[#0E9384] hover:text-white ' +
      'shadow-md hover:shadow-lg transition-colors',
    
    ghost:
      'text-[#0E9384] hover:bg-[#0E9384]/10 ' +
      'border border-transparent hover:border-[#0E9384]/20',
    
    premium:
      'bg-gradient-to-br from-[#0E9384] via-[#0C8274] to-[#0A7568] text-white ' +
      'shadow-2xl hover:shadow-2xl hover:shadow-[#0E9384]/30 ' +
      'border border-white/20 ' +
      'hover:scale-[1.02] hover:brightness-110 ' +
      'relative overflow-hidden ' +
      'before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/10 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000',
  }

  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  )
}

/** Sharper ghost button variant */
export function GhostButton({
  className,
  sharp = true,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { sharp?: boolean }) {
  return (
    <Button
      variant="outline"
      sharp={sharp}
      className={cn('border-slate-300 text-slate-700 hover:bg-slate-50', className)}
      {...(props as ButtonProps)}
    />
  )
}

/** Premium card with sharper edges */
export function Card({
  className,
  sharp = false,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { sharp?: boolean }) {
  return (
    <div
      className={cn(
        'border border-slate-200 bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300',
        sharp ? 'rounded-lg' : 'rounded-2xl',
        'hover:border-slate-300',
        className
      )}
      {...props}
    />
  )
}

/** Sharper badge */
export function Badge({ 
  children, 
  sharp = false 
}: { 
  children: React.ReactNode 
  sharp?: boolean 
}) {
  return (
    <span className={cn(
      "inline-flex items-center bg-[#0E9384]/10 text-[#0E9384] font-medium",
      sharp ? "rounded px-2 py-1 text-xs" : "rounded-full px-3 py-1 text-xs"
    )}>
      {children}
    </span>
  )
}