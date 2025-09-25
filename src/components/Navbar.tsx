import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from './ui'
import PromoBanner from './PromoBanner'

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

  // Close mobile on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

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
          {/* Logo (bigger, without increasing header height) */}
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
            <a href="#plans" className="text-sm text-slate-600 hover:text-slate-900">Plan</a>
            <a href="#faq" className="text-sm text-slate-600 hover:text-slate-900">FAQ</a>
            <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900">Contact</a>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link to="/enroll" className="hidden md:block">
              <Button className="rounded-2xl bg-brand-teal px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lg active:translate-y-0">
                Enroll
              </Button>
            </Link>

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
              <NavLink to="/" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">Home</NavLink>
              <a href="#plans" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">Plan</a>
              <a href="#faq" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">FAQ</a>
              <a href="#contact" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">Contact</a>
              <Link to="/enroll" onClick={() => setMobileOpen(false)} className="mt-2 rounded-xl bg-brand-teal px-3 py-2 text-sm font-semibold text-white shadow-soft">
                Enroll
              </Link>
            </nav>
          </div>
        </div>

        {/* Sub-bar when on enroll flow */}
        {!isHome && (
          <div className="w-full border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
            You’re viewing the enrollment flow.{' '}
            <NavLink to="/" className="text-brand-teal underline">
              Back to site
            </NavLink>
          </div>
        )}
      </header>
    </>
  )
}
