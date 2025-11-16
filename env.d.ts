/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly __USE_HTTPS__: boolean;
  readonly __HOST_IP__: string;
  // add other env variables here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
