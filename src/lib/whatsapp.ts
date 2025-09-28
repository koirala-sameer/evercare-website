// src/lib/whatsapp.ts
// Centralized helpers for WhatsApp links & branding

export const getBrandName = (): string =>
  (import.meta.env.VITE_BRAND_NAME as string) || 'EverCare Nepal'

export const getWhatsAppPhone = (): string => {
  const raw = (import.meta.env.VITE_WHATSAPP_PHONE as string) || '9779800000000'
  return raw.replace(/\D+/g, '')
}

/** Build a wa.me link with a sensible default prefill message. */
export const getWhatsAppLink = (message?: string): string => {
  const phone = getWhatsAppPhone()
  const brand = getBrandName()
  const text = message ?? `Hello ${brand} — I’d like to learn more.`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}
