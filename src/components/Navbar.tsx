// src/components/Navbar.tsx
import { useEffect, useRef, useState, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type NavItem = { label: string; href: string; id?: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'How it works', href: '#plans', id: 'plans' }, // "How it works" sits above plans timeline/section
  { label: 'Add-Ons', href: '#addons', id: 'addons' },
  { label: 'FAQ', href: '#faq', id: 'faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState<string | null>(null)
  const location = useLocation()
  const observerRef = useRef<IntersectionObserver | null>(null)
  const headerRef = useRef<HTMLElement | null>(null)

  // --- Sticky styles on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // --- Utility: smooth scroll with sticky-navbar offset
  const scrollWithOffset = (id: string, behavior: ScrollBehavior = 'smooth') => {
    const el = document.getElementById(id)
    if (!el) return
    const headerH = (headerRef.current?.offsetHeight ?? 0) + 12 // add a little breathing room
    const y = el.getBoundingClientRect().top + window.scrollY - headerH
    window.scrollTo({ top: y, behavior })
  }

  // --- Handle clicking nav anchors (desktop + mobile)
  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, id?: string) => {
    if (!id) return
    e.preventDefault()
    setOpen(false)
    // update URL hash without jumping
    if (history.pushState) {
      const url = id ? `#${id}` : '#'
      history.pushState(null, '', url)
    }
    scrollWithOffset(id)
  }

  // --- Active link highlighting based on visible section
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }

    const sections = NAV_ITEMS
      .map((n) => n.id)
      .filter(Boolean)
      .map((id) => document.getElementById(id!))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        root: null,
        rootMargin: '0px 0px -55% 0px', // earlier trigger so the pill feels snappy
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((sec) => obs.observe(sec))
    observerRef.current = obs
    return () => obs.disconnect()
  }, [location.pathname])

  // --- On first load or when hash changes (e.g., direct link), scroll with offset
  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (!hash) return
    // wait one tick to ensure layout is ready
    const t = setTimeout(() => scrollWithOffset(hash, 'auto'), 0)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <header
      ref={headerRef as any}
      className={[
        'sticky top-0 z-50 w-full transition',
        'supports-[backdrop-filter]:backdrop-blur',
        scrolled ? 'bg-white/70 border-b border-slate-200 shadow-[0_2px_20px_rgba(15,23,42,0.06)]' : 'bg-white/40',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
<img src="/logo.png" alt="EverCare logo" className="h-12 sm:h-14 md:h-16 w-auto shrink-0" />          
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.id)}
                className="relative rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-brand-teal"
              >
                <span className="relative z-10">{item.label}</span>
                <AnimatePresence>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 z-0 rounded-xl bg-brand-teal/10"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </AnimatePresence>
              </a>
            )
          })}
          <Link to="/enroll" className="ml-2">
            <span
              className={[
                'inline-flex items-center rounded-xl px-3 py-2 text-sm font-semibold',
                'bg-brand-teal text-white',
                'shadow-[0_8px_16px_rgba(97,191,192,0.28)] hover:shadow-[0_12px_24px_rgba(97,191,192,0.35)]',
                'transition hover:-translate-y-0.5',
              ].join(' ')}
            >
              Enroll
            </span>
          </Link>
        </nav>

        {/* Mobile toggler */}
        <button
          className="inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-200 md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-t border-slate-200 bg-white/85 px-4 py-3 md:hidden"
          >
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.id)}
                      className={[
                        'block rounded-xl px-3 py-2 text-sm font-medium',
                        isActive ? 'bg-brand-teal/10 text-brand-teal' : 'text-slate-700',
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
              <li className="pt-1">
                <Link
                  to="/enroll"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-brand-teal px-3 py-2 text-center text-sm font-semibold text-white"
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
