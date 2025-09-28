import React, { useEffect, useRef, useState } from 'react';
import PromoBanner from './PromoBanner';

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Services', href: '/services' },
  { label: 'Plans', href: '/plans' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const PHONE_NUMBER_DISPLAY = '+977 980-0000000';
const PHONE_NUMBER_TEL = 'tel:+9779800000000';

// Replace with your official WhatsApp number (keep country code)
const WHATSAPP_LINK = 'https://wa.me/9779800000000?text=Hello%20EverCare%20—%20I%27d%20like%20to%20learn%20more';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    const onClickOutside = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onEscape);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onEscape);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      {/* Promo banner (dismissible, persists via localStorage in Base v1) */}
      <PromoBanner
        theme="teal"
        message="Father’s Day Special: First month 15% off on Premium Care • Limited time"
      />

      {/* Nav bar */}
      <div
        className={[
          'backdrop-blur supports-[backdrop-filter]:bg-white/70 transition-all',
          scrolled ? 'bg-white/95 shadow-md' : 'bg-white/90 shadow-sm',
        ].join(' ')}
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Primary"
        >
          <div className="flex items-center justify-between py-2">
            {/* Left: Brand */}
            <div className="flex items-center gap-3">
              <a href="/" className="flex items-center gap-3" aria-label="EverCare home">
                <img
                  src="/logo-evercare.svg"
                  alt="EverCare"
                  className="h-12 sm:h-14 md:h-16 w-auto shrink-0"
                />
              </a>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-slate-700 hover:text-slate-900 transition-colors text-sm font-medium"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Desktop CTAs */}
              <div className="flex items-center gap-3">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold shadow hover:shadow-md transition-all border border-emerald-600/20 bg-emerald-50 hover:bg-emerald-100"
                  aria-label="Chat on WhatsApp"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                  >
                    <path d="M20.52 3.48A11.94 11.94 0 0012.02 0C5.4 0 .03 5.37.03 12c0 2.11.55 4.17 1.6 6L0 24l6.17-1.6A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 21.9a9.9 9.9 0 01-5.05-1.4l-.36-.21-3.66.95.98-3.55-.23-.37A9.93 9.93 0 012.1 12C2.1 6.51 6.51 2.1 12 2.1c2.65 0 5.14 1.03 7.02 2.9A9.86 9.86 0 0121.9 12c0 5.49-4.41 9.9-9.9 9.9zm5.02-7.45c-.27-.14-1.57-.77-1.81-.86-.24-.09-.41-.14-.59.14-.18.27-.68.86-.83 1.04-.15.18-.31.2-.58.07-.27-.14-1.12-.41-2.13-1.31-.79-.7-1.32-1.57-1.47-1.84-.15-.27-.02-.42.12-.56.13-.13.27-.33.4-.5.14-.17.18-.29.27-.48.09-.18.04-.34-.02-.48-.07-.14-.59-1.42-.81-1.95-.21-.51-.43-.44-.59-.45-.15-.01-.33-.01-.51-.01-.18 0-.48.07-.73.34-.24.27-.96.94-.96 2.28s.98 2.65 1.12 2.83c.14.18 1.94 2.96 4.69 4.14.65.28 1.16.45 1.56.58.65.21 1.24.18 1.71.11.52-.08 1.57-.64 1.79-1.25.22-.61.22-1.12.15-1.25-.06-.13-.24-.2-.51-.34z" />
                  </svg>
                  WhatsApp
                </a>

                <a
                  href={PHONE_NUMBER_TEL}
                  className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow hover:shadow-md transition-all bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                  >
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V22a1 1 0 01-1 1C10.86 23 1 13.14 1 1a1 1 0 011-1h4.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.2 2.2z" />
                  </svg>
                  Call {PHONE_NUMBER_DISPLAY}
                </a>
              </div>
            </div>

            {/* Mobile: menu button + compact CTAs */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href={PHONE_NUMBER_TEL}
                className="inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold text-white shadow bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label={`Call ${PHONE_NUMBER_DISPLAY}`}
              >
                Call
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full px-3 py-2 text-xs font-semibold shadow border border-emerald-600/20 bg-emerald-50 hover:bg-emerald-100"
                aria-label="Chat on WhatsApp"
              >
                Chat
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className="ml-1 inline-flex items-center justify-center rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((v) => !v)}
              >
                <svg
                  className="h-6 w-6 text-slate-800"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            id="mobile-menu"
            ref={mobileMenuRef}
            className={[
              'md:hidden origin-top transition-all duration-200',
              menuOpen ? 'scale-y-100 opacity-100' : 'scale-y-95 opacity-0 pointer-events-none',
            ].join(' ')}
          >
            <div className="mt-1 pb-3 pt-2 space-y-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-4 py-3 text-base font-medium text-slate-800 hover:bg-slate-50 focus:bg-slate-100 focus:outline-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}

              <div className="px-4 pt-2 flex items-center gap-2">
                <a
                  href={PHONE_NUMBER_TEL}
                  className="flex-1 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold text-white shadow bg-emerald-600 hover:bg-emerald-700"
                >
                  Call
                </a>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold shadow border border-emerald-600/20 bg-emerald-50 hover:bg-emerald-100"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
