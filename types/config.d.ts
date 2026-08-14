export type PhoneNumber = string;

/** Global bot settings (values from config.ts). */
export interface BotConfig {
  /** Owner numbers (array). */
  owner: PhoneNumber[];
  /** Moderator numbers (array). */
  mods: PhoneNumber[];
  /** Premium numbers (array). */
  prems: PhoneNumber[];
  /** Owner name. */
  nameowner: string;
  /** Owner number (string). */
  numberowner: PhoneNumber;
  /** Contact email. */
  mail: string;
  /** Group link. */
  gc: string;
  /** Instagram link. */
  instagram: string;
  /** Bot watermark. */
  wm: string;
  /** Loading message. */
  wait: string;
  /** Error message. */
  eror: string;
  /** Sticker loading message. */
  stiker_wait: string;
  /** Thumbnail URL. */
  thumb: string;
  /** Sticker pack name. */
  packname: string;
  /** Sticker author. */
  author: string;
  /** Maximum warnings (string in config, used numerically). */
  maxwarn: string | number;
  /** Main API key. */
  btc: string;
  /** Premium access key. */
  aksesKey: string;
}

/** API endpoint list. */
export interface BotApis {
  [name: string]: string;
}

/** API keys per endpoint. */
export interface BotApiKeys {
  [url: string]: string;
}

/**
 * global.API helper — builds an API endpoint URL.
 * `(name in global.APIs ? global.APIs[name] : name) + path + query`
 */
export type BotApiFn = (
  name: string,
  path?: string,
  query?: Record<string, unknown>,
  apikeyqueryname?: string
) => string;
