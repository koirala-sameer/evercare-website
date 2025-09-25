import { cn } from '../utils/cn'
import React from 'react'

export function Button({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-2xl bg-brand-teal px-5 py-2.5 text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0', className)} {...props} />
}

export function GhostButton({className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn('rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-slate-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0', className)} {...props} />
}

export function Card({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-3xl border border-slate-200 bg-white p-6 shadow-soft', className)} {...props} />
}

export function Badge({children}:{children: React.ReactNode}) {
  return <span className="inline-flex items-center rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-medium text-brand-teal">{children}</span>
}