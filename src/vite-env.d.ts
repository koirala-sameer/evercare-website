/// <reference types="vite/client" />

// Extend env typing for your custom vars
interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean

  // Custom (must start with VITE_)
  readonly VITE_WHATSAPP_PHONE?: string
  readonly VITE_BRAND_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
