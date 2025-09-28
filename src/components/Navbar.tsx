import { useEffect, useRef, useState, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PromoBanner from './PromoBanner'

type NavItem = { label: string; href: string; id?: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'How it works', href: '#plans', id: 'plans' },
  { label: 'Add-Ons', href: '#addons', id: 'addons' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
]

const LOGO_SRC = '/logo.svg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const location = useLocation()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)
  const menuButtonRef = useRef<HTMLButtonElement | null>(null)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  // Sticky styles on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Smooth scroll with sticky-navbar offset
  const scrollWithOffset = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = (headerRef.current?.offsetHeight ?? 0) + 12
    const y = el.getBoundingClientRect().top + window.scrollY - headerH
    window.scrollTo({ top: y, behavior })
  }

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!id) return
    e.preventDefault()
    setOpen(false)
    if (history.pushState) {
      const url = id ? `#${id}` : '#'
      history.pushState(null, '', url)
    }
    scrollWithOffset(id)
  }

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId(null)
      return
    }
    const ids = NAV_ITEMS.map((n) => n.id).filter(Boolean) as string[]
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]?.target?.id) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.2, 0.5, 1] }
    )
    observerRef.current = observer
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [location.pathname])

  // Close mobile on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent | any) => {
      const target = e.target as Node
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside as any)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onClickOutside as any)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  return (
    <header
      ref={headerRef as any}
      className={[
        'sticky top-0 z-50 w-full transition-colors',
        scrolled
          ? 'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85 shadow-md'
          : 'bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm',
        'border-b border-slate-200',
      ].join(' ')}
    >
      <PromoBanner
        theme="teal"
        message="Father’s Day Special: First month 15% off on Premium Care • Limited time"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label="EverCare home">
          <img
            src={LOGO_SRC}
            alt="EverCare logo"
            className="h-12 sm:h-14 md:h-16 w-auto shrink-0"
            decoding="async"
            fetchPriority="high"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              if (img.src !== '/logo.png') img.src = '/logo.png'
            }}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-3 md:flex">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.id)}
                    data-active={isActive ? 'true' : undefined}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'inline-flex items-center rounded-xl px-3 py-2 text-[15px] font-medium',
                      'text-slate-900 hover:text-slate-950 hover:bg-slate-100',
                      'data-[active=true]:bg-slate-900 data-[active=true]:text-white',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                      'transition-colors',
                    ].join(' ')}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <span className="mx-2 h-6 w-px bg-slate-200" aria-hidden />

          <Link
            to="/enroll"
            className={[
              'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold',
              'bg-brand-teal text-white shadow-sm hover:brightness-95 active:brightness-90',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
              'transition',
            ].join(' ')}
          >
            Enroll
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            ref={menuButtonRef}
            className="ml-1 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white p-2 text-slate-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            ref={mobileMenuRef as any}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.id)}
                      data-active={isActive ? 'true' : undefined}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'block rounded-lg px-3 py-2.5 text-[15px] font-medium',
                        'text-slate-900 hover:text-slate-950 hover:bg-slate-100',
                        'data-[active=true]:bg-slate-900 data-[active=true]:text-white',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60',
                        'transition-colors',
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}

              <li className="pt-2">
                <Link
                  to="/enroll"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-brand-teal px-3 py-2.5 text-center text-white font-semibold shadow-sm hover:brightness-95 active:brightness-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
                >
                  Enroll
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
