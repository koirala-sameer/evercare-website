/// <reference types="vite/client" />

// Extend env typing for your custom vars
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_WHATSAPP_PHONE?: string
  readonly VITE_BRAND_NAME?: string
  readonly VITE_EVERCARE_PHONE?: string
  readonly VITE_EVERCARE_WHATSAPP?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}