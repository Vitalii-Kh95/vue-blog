/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __HOST_IP__: string;
declare const __USE_HTTPS__: boolean;
