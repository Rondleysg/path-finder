/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly GOOGLE_MAPS_API_KEY: string
    readonly VITE_RENDER_MAP: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }