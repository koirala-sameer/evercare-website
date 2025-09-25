import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from './ui'

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-3"><img src="/logo.png" alt="EverCare logo" className="h-8 w-8" /></Link>
        <nav className="hidden gap-8 md:flex">
          <a href="#services" className="text-slate-700 hover:text-brand-teal transition-colors">Services</a>
          <a href="#plans" className="text-slate-700 hover:text-brand-teal transition-colors">Plans</a>
          <a href="#why" className="text-slate-700 hover:text-brand-teal transition-colors">Why EverCare</a>
          <a href="#faq" className="text-slate-700 hover:text-brand-teal transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <NavLink to="/enroll">
            <Button>Enroll</Button>
          </NavLink>
        </div>
      </div>
      {!isHome && (
        <div className="w-full border-t border-slate-200 bg-slate-50 px-4 py-2 text-center text-sm text-slate-600">
          You’re viewing the enrollment flow. <NavLink to="/" className="text-brand-teal underline">Back to site</NavLink>
        </div>
      )}
    </header>
  )
}