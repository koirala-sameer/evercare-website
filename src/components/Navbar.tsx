import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from './ui'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Header shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Lock scroll & enable ESC to close when menu is open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false)
    }
    if (mobileOpen) {
      document.addEventListener('keydown', onKey)
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [mobileOpen])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 shadow-sm'
      } backdrop-blur`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        {/* Logo (bigger, without increasing header height) */}
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="EverCare logo"
            className="h-20 w-auto shrink-0 -my-2"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#services" className="text-slate-700 hover:text-brand-teal transition-colors">
            Services
          </a>
          <a href="#plans" className="text-slate-700 hover:text-brand-teal transition-colors">
            Plans
          </a>
          <a href="#faq" className="text-slate-700 hover:text-brand-teal transition-colors">
            FAQ
          </a>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/enroll">
            <Button className="rounded-full px-5 md:px-6 py-2 shadow-soft hover:shadow-md transition-shadow">
              Enroll
            </Button>
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand-teal"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(v => !v)}
        >
          <span className="sr-only">{mobileOpen ? 'Close menu' : 'Open menu'}</span>
          {mobileOpen ? (
            // X icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile slide-over menu */}
      <div
        className={`md:hidden fixed inset-0 z-[60] ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 transition-opacity duration-200 ${mobileOpen ? 'opacity-100' : 'opacity-0'} bg-slate-900/40 backdrop-blur-sm`}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        {/* Panel */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className={`absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <span className="text-sm font-medium text-slate-500">Menu</span>
            <button
              type="button"
              className="rounded-md p-2 outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-brand-teal"
              onClick={() => setMobileOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            <a
              href="#services"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50 hover:text-brand-teal transition-colors"
            >
              Services
            </a>
            <a
              href="#plans"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50 hover:text-brand-teal transition-colors"
            >
              Plans
            </a>
            <a
              href="#faq"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-slate-800 hover:bg-slate-50 hover:text-brand-teal transition-colors"
            >
              FAQ
            </a>

            <div className="h-px my-2 bg-slate-200" />

            <NavLink
              to="/enroll"
              onClick={() => setMobileOpen(false)}
              className="rounded-full px-4 py-2 text-center font-medium text-white bg-brand-teal hover:opacity-90 transition-opacity"
            >
              Enroll
            </NavLink>
          </nav>
        </div>
      </div>

      {!isHome && (
        <div className="w-full border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
          You’re viewing the enrollment flow.{' '}
          <NavLink to="/" className="text-brand-teal underline">
            Back to site
          </NavLink>
        </div>
      )}
    </header>
  )
}
