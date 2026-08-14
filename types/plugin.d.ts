import type { WaMessage } from './connection.js';
import type { WaConnection } from './connection.js';

export interface WaPluginCommandContext {
  conn: WaConnection;
  participants?: Array<{ id?: string; jid?: string; phoneNumber?: string; admin?: string | null; isAdmin?: boolean; isSuperAdmin?: boolean; [key: string]: unknown }>;
  groupMetadata?: {
    id?: string;
    subject?: string;
    participant?: string;
    participants?: Array<{ id?: string; jid?: string; phoneNumber?: string; isAdmin?: boolean; isSuperAdmin?: boolean; [key: string]: unknown }>;
    [key: string]: unknown;
  };
  usedPrefix?: string;
  command?: string;
  text?: string;
  args?: any[];
  match?: RegExpMatchArray | null;
  noPrefix?: string;
  _args?: string[];
  user?: Record<string, unknown>;
  bot?: Record<string, unknown>;
  chatUpdate?: unknown;
  isOwner?: boolean;
  isROwner?: boolean;
  isMods?: boolean;
  isPrems?: boolean;
  isAdmin?: boolean;
  isBotAdmin?: boolean;
  [key: string]: any;
}

export interface WaPlugin {
  (this: WaConnection, m: WaMessage, extra?: WaPluginCommandContext): Promise<unknown> | unknown;

  /** Main command / event handler. */
  handler?: (this: WaConnection, m: WaMessage, ...args: unknown[]) => Promise<unknown> | unknown;
  /** Executed before the handler for every message. */
  before?: (this: WaConnection, m: WaMessage, context: WaPluginCommandContext) => Promise<unknown> | unknown;
  /** Executed for all messages (without a command). */
  all?: (this: WaConnection, m: WaMessage, chatUpdate: WaPluginCommandContext) => Promise<unknown> | unknown;
  /** Recognized commands: RegExp | string | mixed array. */
  command?: RegExp | string | Array<RegExp | string>;
  /** Command names (help). */
  help?: string[];
  /** Command categories (tags). */
  tags?: string[];
  /** Per-plugin custom prefix. */
  customPrefix?: RegExp | string | Array<RegExp | string>;
  /** Disable the plugin. */
  disabled?: boolean;
  /** Real owner only. */
  rowner?: boolean;
  /** Owner only. */
  owner?: boolean;
  /** Moderator only. */
  mods?: boolean;
  /** Premium only. */
  premium?: boolean;
  /** Groups only. */
  group?: boolean;
  /** Bot admin required. */
  botAdmin?: boolean;
  /** User admin required. */
  admin?: boolean;
  /** Private chats only. */
  private?: boolean;
  /** Registration required. */
  register?: boolean;
  /** Enable in NSFW groups? */
  nsfw?: boolean;
  /** Only active when the group's RPG feature is on. */
  rpg?: boolean;
  /** Only active when the group's game feature is on. */
  game?: boolean;
  /** XP granted per command (default 17). */
  exp?: string | number;
  /** Money granted per command. */
  money?: number;
  /** Minimum user level. */
  level?: number;
  /** Executed after the handler succeeds. */
  after?: (this: WaConnection, m: WaMessage, extra?: WaPluginCommandContext) => Promise<unknown> | unknown;
  /** Usage limit. */
  limit?: boolean | number;
  /** Cooldown in ms. */
  cooldown?: number;
  /** Alternative fail handler. */
  fail?: (type: string, m: WaMessage, conn: unknown) => void;
}
