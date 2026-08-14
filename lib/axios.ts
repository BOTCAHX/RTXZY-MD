/**
 * TS7 (tsgo) resolves `import axios from 'axios'` as the module namespace,
 * so plugins using `axios.get/post` fail to typecheck. This shim re-exports
 * the real default instance (AxiosStatic) under the same module name.
 */
import { createRequire } from 'module';
import type { WaApiJson } from '../types/api.js';

const require = createRequire(import.meta.url);

const axiosInstance = require('axios') as {
  (config: Record<string, unknown>): Promise<{ data: unknown; [key: string]: unknown }>;
  get(url: string, config: { responseType: 'arraybuffer' } & Record<string, unknown>): Promise<{ data: Buffer; [key: string]: unknown }>;
  get<T = WaApiJson>(url: string, config?: Record<string, unknown>): Promise<{ data: T; [key: string]: unknown }>;
  post(url: string, data: unknown, config: { responseType: 'arraybuffer' } & Record<string, unknown>): Promise<{ data: Buffer; [key: string]: unknown }>;
  post<T = WaApiJson>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<{ data: T; [key: string]: unknown }>;
  [key: string]: unknown;
};

export default axiosInstance;