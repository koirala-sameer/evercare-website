import { useEffect, useRef, useState, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import TopBar from './TopBar'

type NavItem = { label: string; href: string; id?: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'How it Works', href: '#plans', id: 'plans' },
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
        'sticky top-0 z-50 w-full transition-colors mobile-nav-optimized',
        scrolled
          ? 'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-md'
          : 'bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/55 shadow-sm',
        'border-b border-slate-200',
      ].join(' ')}
    >
      <TopBar />

      <div className="mx-auto max-w-[1200px] flex items-center justify-between px-4 py-3 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)} aria-label="EverCare home">
          <img
            src={LOGO_SRC}
            alt="EverCare logo"
            className="h-12 md:h-14 w-auto object-contain"
            decoding="async"
            fetchPriority="high"
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement
              if (img.src !== '/logo.png') img.src = '/logo.png'
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleAnchorClick(e, item.id)}
                data-active={isActive ? 'true' : undefined}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'transition-colors font-medium',
                  'text-[#112231]/80 hover:text-[#0E9384]',
                  'data-[active=true]:text-[#0E9384] border-b-2 border-transparent data-[active=true]:border-[#0E9384]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9384]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-3 py-2',
                ].join(' ')}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right-side Contact button */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/contact"
            className="rounded-lg border-2 border-[#0E9384] text-[#0E9384] font-semibold px-6 py-2.5 hover:bg-[#0E9384] hover:text-white transition-all duration-300 shadow-sm"
          >
            Contact
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          ref={menuButtonRef}
          className="md:hidden ml-2 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white p-3 text-[#112231] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9384]/60 cta-touch mobile-tap-feedback"
          onClick={() => setOpen((s) => !s)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            ref={mobileMenuRef as any}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="border-t border-slate-200 bg-white px-4 py-3 md:hidden shadow-[0_8px_24px_rgba(15,23,42,0.08)] mobile-safe-area"
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
                      className={[
                        'block rounded-lg px-4 py-3 text-[15px] font-medium cta-touch mobile-tap-feedback',
                        'text-[#112231]/90 hover:text-[#0E9384] hover:bg-[#E8F5F3]',
                        'data-[active=true]:bg-[#0E9384] data-[active=true]:text-white transition-colors',
                      ].join(' ')}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
              {/* Mobile contact button */}
              <li className="pt-2">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-lg border-2 border-[#0E9384] text-center text-[#0E9384] font-semibold px-4 py-3 hover:bg-[#0E9384] hover:text-white transition-all duration-300 shadow-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
