import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button } from './ui'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 shadow-sm'
      } backdrop-blur`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 relative">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.png"
            alt="EverCare logo"
            className="h-20 w-auto shrink-0 -my-2" 
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="text-slate-700 hover:text-brand-teal transition-colors"
          >
            Services
          </a>
          <a
            href="#plans"
            className="text-slate-700 hover:text-brand-teal transition-colors"
          >
            Plans
          </a>
          <a
            href="#faq"
            className="text-slate-700 hover:text-brand-teal transition-colors"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <NavLink to="/enroll">
            <Button className="rounded-full px-5 md:px-6 py-2 shadow-soft hover:shadow-md transition-shadow">
              Enroll
            </Button>
          </NavLink>
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
