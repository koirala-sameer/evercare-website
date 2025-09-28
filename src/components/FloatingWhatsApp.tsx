import React, { useMemo } from "react";

type FloatingWhatsAppProps = {
  whatsapp?: string; // number with country code, no spaces
  message?: string;
};

export default function FloatingWhatsApp({
  whatsapp,
  message = "Hello EverCare — I’d like to know more about your elder care services.",
}: FloatingWhatsAppProps) {
  const resolvedWA =
    whatsapp?.trim() || import.meta.env.VITE_EVERCARE_WHATSAPP || "9779800000000";

  const waHref = useMemo(() => {
    const base = `https://wa.me/${resolvedWA}`;
    const url = new URL(base);
    url.searchParams.set("text", message);
    return url.toString();
  }, [resolvedWA, message]);

  return (
    <div className="fab z-fab">
      <a
        href={waHref}
        aria-label="Chat on WhatsApp"
        className="btn btn-amber shadow-soft"
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* WhatsApp icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.44 0 .06 5.38.06 12c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62A11.88 11.88 0 0 0 12.06 24C18.68 24 24.06 18.62 24.06 12c0-3.17-1.24-6.16-3.54-8.52zM12.06 22a9.94 9.94 0 0 1-5.08-1.38l-.36-.21-3.68.96.98-3.58-.23-.37A9.99 9.99 0 1 1 22.06 12c0 5.52-4.48 10-10 10zm5.86-7.37c-.32-.16-1.86-.91-2.15-1.02-.29-.11-.5-.16-.71.16-.21.32-.82 1.02-1.01 1.23-.19.21-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.77-2.18-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.63-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.39-.29.32-1.11 1.08-1.11 2.63 0 1.55 1.14 3.05 1.3 3.26.16.21 2.25 3.43 5.44 4.8.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.86-.76 2.12-1.49.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z"
            fill="currentColor"
          />
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
