/** Dynamic JSON payloads from third-party REST APIs (pattern same as DbUser/DbChat). */
export type WaApiJson = { [key: string]: any };

/** Common api.botcahx.eu.org envelope: `{ status, result }`. */
export interface WaApiEnvelope extends WaApiJson {
  status?: string | boolean;
  result?: WaApiJson;
}

export type WaApiJsonPromise = Promise<WaApiJson>;
