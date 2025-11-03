import { Heart, Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-gradient-to-br from-[#f4faf9] via-[#fefaf9] to-[#f9fdfc] text-slate-700 pt-16 pb-10 mt-16 border-t border-slate-200/60">
      {/* Animated soft background overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(14,147,132,0.07),transparent_60%),radial-gradient(circle_at_75%_75%,rgba(245,138,140,0.07),transparent_60%)] animate-pulse-slow" />

      {/* Subtle top divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-300/40 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-4 z-10">
        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="EverCare Logo" className="h-8 w-auto" />
          </div>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            Compassionate, transparent, and complete care for your loved ones in Nepal —
            empowering families abroad with total peace of mind.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-base font-semibold text-brand-ink mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-brand-teal transition">Services</Link></li>
            <li><Link to="/services#plans" className="hover:text-brand-teal transition">Membership Plans</Link></li>
            <li><Link to="/services#onetime" className="hover:text-brand-teal transition">Add-On Services</Link></li>
            <li><Link to="/faq" className="hover:text-brand-teal transition">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-brand-teal transition">About Us</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-base font-semibold text-brand-ink mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-brand-teal" />
              <a href="tel:+9779800000000" className="hover:text-brand-teal transition">+977 9800000000</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-brand-teal" />
              <a href="mailto:info@evercare.com.np" className="hover:text-brand-teal transition">info@evercare.com.np</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} className="text-brand-teal" />
              <span>Kathmandu, Nepal</span>
            </li>
          </ul>
        </div>

        {/* Social + Trust */}
        <div>
          <h3 className="text-base font-semibold text-brand-ink mb-3">Connect With Us</h3>
          <div className="flex items-center gap-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1877F2] transition">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E1306C] transition">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#1DA1F2] transition">
              <Twitter size={20} />
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Trusted by families in <span className="font-semibold text-brand-teal">12+ countries</span> worldwide.
          </p>
        </div>
      </div>

      {/* Divider line */}
      <div className="relative mt-10 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent" />

      {/* Bottom line */}
      <div className="relative mt-6 text-center text-xs text-slate-500 z-10">
        <p className="flex flex-col sm:flex-row items-center justify-center gap-1">
          <span className="flex items-center gap-1">
            <img src="/images/logo.png" alt="EverCare Mini Logo" className="h-4" />
            © 2025 EverCare Nepal
          </span>
          <span className="flex items-center gap-1">
            Made with{" "}
            <Heart className="text-[#f58a8c] h-3 w-3 animate-pulse" /> for families everywhere
          </span>
        </p>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/9779800000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white rounded-full p-4 shadow-xl hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6">
          <path d="M19.11 17.47c-.3-.15-1.8-.9-2.08-1-.27-.1-.46-.15-.65.15-.2.3-.75 1-.92 1.2-.17.2-.34.22-.64.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.8-1.67-2.1-.17-.3-.02-.47.13-.62.13-.13.3-.34.45-.5.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.65-1.55-.9-2.12-.24-.57-.48-.5-.65-.5h-.55c-.18 0-.46.07-.7.34s-.9.87-.9 2.1.92 2.46 1.05 2.63c.13.17 1.8 2.9 4.35 4.06.61.26 1.1.42 1.47.53.62.2 1.18.17 1.63.1.5-.08 1.5-.6 1.7-1.18.2-.57.2-1.06.13-1.18-.06-.12-.24-.2-.53-.34zM16 4C9.37 4 4 9.36 4 16c0 2.26.7 4.37 1.9 6.13L4 28l6.13-1.9A11.9 11.9 0 0016 28c6.63 0 12-5.36 12-12S22.63 4 16 4z" />
        </svg>
      </a>

      {/* Animation keyframes */}
      <style>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.03);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
}
