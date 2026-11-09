/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LEETCODE_USERNAME?: string;
  readonly VITE_FORMSPREE_ENDPOINT?: string;
  readonly VITE_ENABLE_ANALYTICS?: string;
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

