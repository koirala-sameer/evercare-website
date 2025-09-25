import { useEffect, useMemo, useState } from 'react'
import { X, Info } from 'lucide-react'
import { cn } from '../utils/cn'

type Theme = 'teal' | 'amber' | 'slate'

interface PromoBannerProps {
  message: string
  theme?: Theme
  dismissible?: boolean
  className?: string
  storageKey?: string // optional key for localStorage
}

/**
 * Dismissible, themeable promo banner.
 * Persistence resets daily: once dismissed, it reappears the next calendar day.
 */
export default function PromoBanner({
  message,
  theme = 'teal',
  dismissible = true,
  className,
  storageKey = 'promoBanner:dismissed',
}: PromoBannerProps) {
  const todayKey = useMemo(() => {
    const d = new Date()
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${storageKey}:${y}-${m}-${day}`
  }, [storageKey])

  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      const val = localStorage.getItem(todayKey)
      if (val === '1') setHidden(true)
    } catch {}
  }, [todayKey])

  const handleDismiss = () => {
    try {
      localStorage.setItem(todayKey, '1')
    } catch {}
    setHidden(true)
  }

  if (hidden) return null

  const themeClasses: Record<Theme, string> = {
    teal: 'bg-brand-teal/10 text-brand-ink border-brand-teal/30',
    amber: 'bg-amber-50 text-amber-900 border-amber-300',
    slate: 'bg-slate-100 text-slate-800 border-slate-300',
  }

  return (
    <div
      className={cn('w-full border-b', themeClasses[theme], className)}
      role="region"
      aria-label="Promotional announcement"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2">
        <Info className="h-4 w-4" aria-hidden="true" />
        <div className="flex-1 text-sm md:text-[15px]">{message}</div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="rounded-full p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/20"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
