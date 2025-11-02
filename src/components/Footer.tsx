import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            className="h-8 w-8"
            alt="EverCare Logo"
            loading="lazy"
            decoding="async"
          />
          <span className="text-sm text-slate-600">
            © {new Date().getFullYear()} EverCare Nepal
          </span>
        </div>
        <div className="text-sm text-slate-600">
          Made with ❤️ for families everywhere
        </div>
      </div>
    </footer>
  );
}
