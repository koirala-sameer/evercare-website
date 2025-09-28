// src/components/FloatingWhatsApp.tsx
import { useEffect, useMemo, useRef, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { getWhatsAppLink } from '../lib/whatsapp'

const SNOOZE_KEY = 'ec_whatsapp_snooze_until'

type Props = {
  delayMs?: number
  snoozeHours?: number
}

export default function FloatingWhatsApp({ delayMs = 3000, snoozeHours = 24 }: Props) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  const waLink = useMemo(() => getWhatsAppLink(), [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const snoozeUntil = Number(localStorage.getItem(SNOOZE_KEY) || 0)
      const now = Date.now()
      if (snoozeUntil && snoozeUntil > now) return
      timerRef.current = window.setTimeout(() => setVisible(true), delayMs)
    } catch {
      timerRef.current = window.setTimeout(() => setVisible(true), delayMs)
    }
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [delayMs])

  const onDismiss = () => {
    if (typeof window !== 'undefined') {
      const snoozeUntil = Date.now() + snoozeHours * 60 * 60 * 1000
      try {
        localStorage.setItem(SNOOZE_KEY, String(snoozeUntil))
      } catch {}
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="md:hidden fixed bottom-5 right-4 z-[60] pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-emerald-600 px-3 py-2 text-xs font-semibold text-white shadow-lg ring-1 ring-emerald-700/20 hover:bg-emerald-700 transition-colors"
          aria-label="Chat on WhatsApp"
        >
          Chat with us
        </a>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-slate-200 hover:shadow-xl transition-shadow motion-safe:animate-pulse motion-reduce:animate-none"
          aria-label="Open WhatsApp chat"
        >
          <MessageCircle className="h-6 w-6 text-emerald-600" aria-hidden="true" />
          <span className="sr-only">Open WhatsApp chat</span>
        </a>

        <button
          onClick={onDismiss}
          className="ml-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow ring-1 ring-slate-200 hover:bg-slate-50"
          aria-label={`Dismiss WhatsApp prompt for ${snoozeHours} hours`}
        >
          <X className="h-4 w-4 text-slate-600" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
