import type { WaApiJson } from './api.js';

/** Narrow undici `Response.json()` (`Promise<unknown>`) to the shared API JSON shape. */
declare global {
  interface Response {
    json(): Promise<WaApiJson>;
  }
}

export {};
