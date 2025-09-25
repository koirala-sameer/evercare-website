import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState, useCallback } from 'react'
import { Button } from './ui'
import PromoBanner from './PromoBanner'

export default function Navbar() {
  const { pathname, hash } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // --- Simple debounce to avoid double scrolls ---
  const debounceRef = useRef<number | null>(null)
  const debounce = (fn: () => void, delay = 60) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current)
    debounceRef.current = window.setTimeout(() => {
      fn()
      debounceRef.current = null
    }, delay)
  }

  /** ---------- Effects ---------- */
  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile on route/hash change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname, hash])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
  }, [mobileOpen])

  // When arriving on Home with a hash (e.g., /#plans), scroll to it
  useEffect(() => {
    if (isHome && hash) {
      const id = hash.replace('#', '')
      debounce(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHome, hash])

  /** ---------- Helpers ---------- */
  const gotoAnchor = useCallback(
    (id: string) => {
      if (isHome) {
        debounce(() => {
          const el = document.getElementById(id)
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 60)
      } else {
        // Navigate to Home with hash; then scroll after load via the effect above
        window.location.href = `/#${id}`
      }
    },
    [isHome]
  )

  const handleAnchorClick =
    (id: string) =>
    (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      e.preventDefault()
      gotoAnchor(id)
      setMobileOpen(false)
    }

  return (
    <>
      {/* Promo banner above the header */}
      <PromoBanner
        theme="teal"
        message="🎉 Limited launch: Get your first month 20% off. Use code EVERCARE20 during enrollment today."
      />

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 shadow-sm'
        } backdrop-blur`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="EverCare logo"
              className="h-20 w-auto shrink-0 -my-2"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`
              }
            >
              Home
            </NavLink>

            {/* Smooth-scroll anchors */}
            <a
              href="#services"
              onClick={handleAnchorClick('services')}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Services
            </a>
            <a
              href="#plans"
              onClick={handleAnchorClick('plans')}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Plan
            </a>
            <a
              href="#faq"
              onClick={handleAnchorClick('faq')}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              FAQ
            </a>
            <a
              href="#contact"
              onClick={handleAnchorClick('contact')}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              Contact
            </a>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Enroll now scrolls to the Plan section on Home */}
            <Button
              className="hidden md:inline-flex rounded-2xl bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lg active:translate-y-0"
              onClick={handleAnchorClick('plans')}
            >
              Enroll
            </Button>

            <button
              className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
              {mobileOpen ? (
                // X icon
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile slide-over menu */}
        <div className={`md:hidden fixed inset-0 z-[60] ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div
            className={`absolute inset-0 transition ${mobileOpen ? 'bg-black/40 opacity-100' : 'opacity-0'}`}
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          {/* Panel */}
          <div
            className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <Link to="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
                <img src="/logo.png" alt="EverCare" className="h-12 w-auto" />
              </Link>
              <button
                className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-3">
              <NavLink
                to="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                Home
              </NavLink>
              <a
                href="#services"
                onClick={handleAnchorClick('services')}
                className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                Services
              </a>
              <a
                href="#plans"
                onClick={handleAnchorClick('plans')}
                className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                Plan
              </a>
              <a
                href="#faq"
                onClick={handleAnchorClick('faq')}
                className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={handleAnchorClick('contact')}
                className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                Contact
              </a>
              {/* Enroll goes to the plan section */}
              <button
                onClick={handleAnchorClick('plans')}
                className="mt-2 rounded-xl bg-brand-teal px-3 py-2 text-sm font-semibold text-white shadow-soft"
              >
                Enroll
              </button>
            </nav>
          </div>
        </div>

        {/* Sub-bar when not on Home */}
        {!isHome && (
          <div className="w-full border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
            You’re viewing the enrollment flow.{' '}
            <a href="/#plans" className="text-brand-teal underline">Back to plan</a>
          </div>
        )}
      </header>
    </>
  )
}
