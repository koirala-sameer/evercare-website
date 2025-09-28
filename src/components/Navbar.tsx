// src/components/Navbar.tsx
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

// Base-aware path for /public assets (works on subpaths e.g. /evercare-website/)
const publicAsset = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, '')}`
const LOGO_SRC = publicAsset('logo.png')

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

  // Active link highlighting
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
        rootMargin: '0px 0px -55% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    sections.forEach((s) => obs.observe(s))
    observerRef.current = obs
    return () => obs.disconnect()
  }, [location.pathname])

  // Close menu on outside click + Esc
  useEffect(() => {
    if (!open) return
    const onClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
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
        'sticky top-0 z-50 w-full transition',
        'supports-[backdrop-filter]:backdrop-blur',
        scrolled
          ? 'bg-white/70 border-b border-slate-200 shadow-[0_2px_20px_rgba(15,23,42,0.06)]'
          : 'bg-white/40',
      ].join(' ')}
    >
      {/* Promo banner */}
      <PromoBanner
        theme="teal"
        message="Father’s Day Special: First month 15% off on Premium Care • Limited time"
      />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
          aria-label="EverCare home"
        >
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
                    className="relative rounded-xl px-3 py-2 text-sm font-medium text-slate-700 transition hover:text-brand-teal"
                    aria-current={isActive ? 'page' : undefined}
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
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Mobile: just menu button now */}
        <div className="md:hidden flex items-center gap-2">
          <button
            ref={menuButtonRef}
            className="ml-1 inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-slate-200"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
                        isActive
                          ? 'bg-brand-teal/10 text-brand-teal'
                          : 'text-slate-700',
                      ].join(' ')}
                      aria-current={isActive ? 'page' : undefined}
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
