import * as React from 'react'

/**
 * FloatingWhatsApp — round FAB + hint bubble + scroll "jump"
 *
 * - Round 56x56 button.
 * - Hint bubble: “Hello — chat with a real customer rep.” (shows once/day, hover/focus shows too)
 * - Scroll animation: brief bounce on scroll with a cooldown (no constant looping).
 * - Jitter-free: safe-area bottom offset + GPU promotion.
 * - Respects prefers-reduced-motion.
 *
 * Env precedence (new → old → default):
 *   VITE_WHATSAPP_PHONE → VITE_EVERCARE_WHATSAPP → +9779800000000
 */

const HINT_LS_KEY = 'ec_wp_hint_last'  // store yyyy-mm-dd so we only auto-show once/day
const AUTO_SHOW_DELAY_MS = 900         // delay before first auto-show
const AUTO_HIDE_AFTER_MS = 8000        // auto-hide if user doesn't interact

// Scroll "jump" tuning
const SCROLL_BOUNCE_COOLDOWN_MS = 1200;   // minimum time between bounces
const SCROLL_BOUNCE_DURATION_MS = 420;    // how long one bounce lasts
const SCROLL_MIN_DELTA = 8;               // only bounce if scroll moved at least this many px

export default function FloatingWhatsApp() {
  const phone =
    (import.meta as any)?.env?.VITE_WHATSAPP_PHONE ||
    (import.meta as any)?.env?.VITE_EVERCARE_WHATSAPP ||
    '+9779800000000'

  const message = encodeURIComponent('Hi EverCare — can you help me with elder care services?')
  const link = `https://wa.me/${String(phone).replace(/[^\d+]/g, '')}?text=${message}`

  const [showHint, setShowHint] = React.useState(false)
  const autoHideTimer = React.useRef<number | null>(null)
  const autoShowTimer = React.useRef<number | null>(null)

  // ref to the FAB element (for Web Animations API)
  const fabRef = React.useRef<HTMLAnchorElement | null>(null)

  // Auto-show the hint once per day
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const today = new Date()
    const stamp = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
      today.getDate()
    ).padStart(2, '0')}`

    const last = localStorage.getItem(HINT_LS_KEY)
    const shouldShow = last !== stamp

    if (shouldShow) {
      autoShowTimer.current = window.setTimeout(() => {
        setShowHint(true)
        localStorage.setItem(HINT_LS_KEY, stamp)
        autoHideTimer.current = window.setTimeout(() => {
          setShowHint(false)
        }, AUTO_HIDE_AFTER_MS) as unknown as number
      }, AUTO_SHOW_DELAY_MS) as unknown as number
    }

    return () => {
      if (autoShowTimer.current) window.clearTimeout(autoShowTimer.current)
      if (autoHideTimer.current) window.clearTimeout(autoHideTimer.current)
    }
  }, [])

  // Keep the bubble visible while hovering/focusing the FAB
  const onMouseEnter = () => setShowHint(true)
  const onMouseLeave = () => setShowHint(false)
  const onFocus = () => setShowHint(true)
  const onBlur = () => setShowHint(false)

  // Scroll-triggered “jump” animation (brief, with cooldown)
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    const el = fabRef.current
    if (!el) return

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false
    if (reduceMotion) return // respect user preference

    let lastY = window.scrollY
    let lastTime = 0
    let rafId: number | null = null

    const doBounce = () => {
      // cancel any in-progress animation to avoid stacking
      try {
        el.getAnimations?.().forEach((a) => a.cancel())
      } catch {}
      // subtle Y bounce
      el.animate(
        [
          { transform: 'translateZ(0) translateY(0)' },
          { transform: 'translateZ(0) translateY(-9px)' },
          { transform: 'translateZ(0) translateY(0)' },
        ],
        {
          duration: SCROLL_BOUNCE_DURATION_MS,
          easing: 'cubic-bezier(0.2, 0.7, 0.2, 1)',
        }
      )
    }

    const onScroll = () => {
      const now = performance.now()
      const dy = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY

      if (dy < SCROLL_MIN_DELTA) return
      if (now - lastTime < SCROLL_BOUNCE_COOLDOWN_MS) return

      lastTime = now
      // use rAF to avoid doing work in scroll event directly
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(doBounce)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      {/* Hint bubble */}
      <div
        className={[
          'fixed right-5 z-50',
          'pointer-events-none select-none',
          showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5',
          'transition-all duration-200 ease-out',
        ].join(' ')}
        style={{
          bottom: 'calc(4.75rem + env(safe-area-inset-bottom, 0px))', // 56px button + gap
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
        aria-hidden={!showHint}
      >
        <div className="relative">
          {/* Bubble card */}
          <div className="pointer-events-auto max-w-[220px] rounded-2xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-xl">
            <span className="font-semibold">Hello</span> — chat with a real customer rep.
            <button
              type="button"
              aria-label="Close"
              onClick={() => setShowHint(false)}
              className="absolute right-1.5 top-1.5 inline-grid h-6 w-6 place-items-center rounded-md text-slate-500 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Tail */}
          <div className="absolute -bottom-2 right-4 h-3 w-3 rotate-45 rounded-[2px] border-b border-r border-slate-200 bg-white" />
        </div>
      </div>

      {/* The round FAB */}
      <a
        ref={fabRef}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        className={[
          'fixed right-5 bottom-5 z-50',
          // round shape & size
          'grid place-items-center h-14 w-14 rounded-full',
          // color & shadow
          'bg-[#25D366] text-white shadow-lg',
          // hover/focus animation (no filters to avoid repaint jank)
          'transition-transform duration-150 ease-out',
          'hover:scale-[1.05] hover:shadow-xl active:scale-[0.98]',
          // focus ring
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        ].join(' ')}
        style={{
          // avoid iOS jump when the address bar shows/hides
          bottom: 'calc(1.25rem + env(safe-area-inset-bottom, 0px))',
          // stabilize during scroll / promote to its own compositor layer
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          willChange: 'transform',
        }}
      >
        {/* Optional soft halo behind the button */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inline-block h-14 w-14 rounded-full ring-2 ring-[#25D366]/30"
          style={{ zIndex: -1 }}
        />

        {/* WhatsApp glyph */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M20.52 3.48A11.91 11.91 0 0 0 12.06 0C5.46 0 .1 5.36.1 11.96c0 2.1.55 4.15 1.6 5.96L0 24l6.26-1.63a11.88 11.88 0 0 0 5.8 1.5h.01c6.6 0 11.96-5.36 11.96-11.96 0-3.2-1.25-6.2-3.51-8.43ZM12.07 21.4h-.01a9.41 9.41 0 0 1-4.8-1.31l-.34-.2-3.72.97.99-3.63-.22-.37a9.44 9.44 0 0 1-1.44-5A9.47 9.47 0 0 1 12.06 2.5c2.53 0 4.9.98 6.69 2.76a9.43 9.43 0 0 1 2.78 6.7 9.48 9.48 0 0 1-9.46 9.44Zm5.43-7.08c-.3-.16-1.76-.87-2.03-.97-.27-.1-.47-.16-.67.16-.2.32-.77.97-.95 1.17-.17.2-.35.23-.64.08-.3-.16-1.26-.46-2.4-1.47-.88-.78-1.48-1.74-1.66-2.03-.17-.3-.02-.46.13-.62.13-.13.3-.35.45-.52.15-.17.2-.29.3-.48.1-.2.04-.37-.02-.52-.06-.16-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.48 0 1.46 1.08 2.88 1.24 3.08.16.21 2.14 3.26 5.18 4.43.72.31 1.28.49 1.72.62.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.12-.28-.2-.58-.36Z" />
        </svg>
      </a>
    </>
  )
}
