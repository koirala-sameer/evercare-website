import React, { useMemo } from "react";

type FloatingCTAProps = {
  /** Plain phone number for tel: link. Example: +9779800000000 */
  phone?: string;
  /** WhatsApp number with country code, no spaces/dashes. Example: 9779800000000 */
  whatsapp?: string;
  /** Pre-filled WhatsApp message */
  whatsappMessage?: string;
  /** Optional label overrides */
  labels?: {
    call?: string;
    whatsapp?: string;
  };
  /** Optional UTM params appended to links for attribution */
  utm?: Record<string, string>;
};

function withUTM(url: string, utm?: Record<string, string>) {
  if (!utm || Object.keys(utm).length === 0) return url;
  const u = new URL(url, window.location.origin);
  Object.entries(utm).forEach(([k, v]) => u.searchParams.set(k, v));
  return u.toString();
}

export default function FloatingCTA({
  phone,
  whatsapp,
  whatsappMessage = "Hello EverCare — I'd like to know more about your elder care services.",
  labels,
  utm,
}: FloatingCTAProps) {
  const resolvedPhone = phone?.trim() || import.meta.env.VITE_EVERCARE_PHONE || "+9779800000000";
  const resolvedWA =
    whatsapp?.trim() || import.meta.env.VITE_EVERCARE_WHATSAPP || "9779800000000";

  const callHref = useMemo(() => {
    const tel = `tel:${resolvedPhone}`;
    return tel;
  }, [resolvedPhone]);

  const waHref = useMemo(() => {
    const base = `https://wa.me/${resolvedWA}`;
    const url = new URL(base);
    url.searchParams.set("text", whatsappMessage);
    return withUTM(url.toString(), utm);
  }, [resolvedWA, whatsappMessage, utm]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp Button */}
      <a
        href={waHref}
        aria-label={labels?.whatsapp ?? "Chat on WhatsApp"}
        className="group relative rounded-lg bg-[#25D366] px-6 py-4 text-white font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 min-w-[180px] justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.44 0 .06 5.38.06 12c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62A11.88 11.88 0 0 0 12.06 24C18.68 24 24.06 18.62 24.06 12c0-3.17-1.24-6.16-3.54-8.52zM12.06 22a9.94 9.94 0 0 1-5.08-1.38l-.36-.21-3.68.96.98-3.58-.23-.37A9.99 9.99 0 1 1 22.06 12c0 5.52-4.48 10-10 10zm5.86-7.37c-.32-.16-1.86-.91-2.15-1.02-.29-.11-.5-.16-.71.16-.21.32-.82 1.02-1.01 1.23-.19.21-.37.23-.69.08-.32-.16-1.34-.49-2.55-1.56-.94-.83-1.58-1.86-1.77-2.18-.19-.32-.02-.5.14-.66.15-.15.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.39-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.63-.52-.54-.71-.55l-.61-.01c-.21 0-.55.08-.84.39-.29.32-1.11 1.08-1.11 2.63 0 1.55 1.14 3.05 1.3 3.26.16.21 2.25 3.43 5.44 4.8.76.33 1.35.53 1.81.68.76.24 1.45.21 2 .13.61-.09 1.86-.76 2.12-1.49.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37z"/>
        </svg>
        <span className="font-semibold">{labels?.whatsapp ?? "WhatsApp"}</span>
      </a>

      {/* Call Button */}
      <a
        href={callHref}
        aria-label={labels?.call ?? "Call EverCare"}
        className="group relative rounded-lg bg-gradient-to-br from-[#0E9384] to-[#0A7568] px-6 py-4 text-white font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 min-w-[180px] justify-center"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V21a1 1 0 0 1-1 1C10.07 22 2 13.93 2 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2z"/>
        </svg>
        <span className="font-semibold">{labels?.call ?? "Call Now"}</span>
      </a>
    </div>
  );
}