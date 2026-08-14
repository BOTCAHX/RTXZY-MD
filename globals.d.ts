// Runtime bot global declarations — real types (see folder types/).
// Values are set via `global.*` in config.ts / main.ts, read without
// the prefix in handler.ts / lib / plugins.

import type {
  BotConfig,
  BotApis,
  BotApiKeys,
  BotApiFn,
} from './types/config.js';
import type { BotDatabase } from './types/database.js';
import type { WaConnection, WaMessage } from './types/connection.js';

declare global {
  /** Plugin type available without imports in plugin files. */
  type WaPlugin = import('./types/plugin.js').WaPlugin;

  var owner: BotConfig['owner'];
  var mods: BotConfig['mods'];
  var prems: BotConfig['prems'];
  var nameowner: BotConfig['nameowner'];
  var numberowner: BotConfig['numberowner'];
  var mail: BotConfig['mail'];
  // gc is already used by Node (@types/node) for the garbage
  // collector — the bot uses it as the group link, so this declaration
  // overrides the built-in Node type.
  var gc: BotConfig['gc'];
  var instagram: BotConfig['instagram'];
  var wm: BotConfig['wm'];
  var wait: BotConfig['wait'];
  var eror: BotConfig['eror'];
  var stiker_wait: BotConfig['stiker_wait'];
  var thumb: BotConfig['thumb'];
  var packname: BotConfig['packname'];
  var author: BotConfig['author'];
  var maxwarn: BotConfig['maxwarn'];
  var btc: BotConfig['btc'];
  var aksesKey: BotConfig['aksesKey'];

  var APIs: BotApis;
  var APIKeys: BotApiKeys;
  var API: BotApiFn;

  var opts: Record<string, any>;
  var prefix: RegExp;
  var timestamp: { start: Date; connect?: Date };

  var db: BotDatabase;
  var DATABASE: BotDatabase;
  var loadDatabase: () => Promise<BotDatabase['data']>;

  var conn: WaConnection;
  var plugins: Record<string, WaPlugin>;
  var reload: (ev: unknown, filename: string) => Promise<boolean | void>;
  var reloadHandler: (restatConn?: boolean) => Promise<boolean>;
  var useQR: boolean;
  var support: {
    ffmpeg: boolean;
    ffprobe: boolean;
    ffmpegWebp: boolean;
    convert: boolean;
    magick: boolean;
    gm: boolean;
    find: boolean;
  };
  var isInit: boolean;
  var mediaProcessor: unknown;

  // Legacy plugin globals (never assigned in core files; read/written by plugins only)
  var Bgardenboxs: number;
  var robot: number;
  var admins: string[];
  var ownernya: string[];
  var hrobo: number;
  var hrhinoceros: number;
  var hlion: number;
  var hkyubi: number;
  var hhorse: number;
  var hgriffin: number;
  var hdragon: number;
  var hcentaur: number;
  var fverif: WaMessage | null;
  var DevMode: boolean;
  var MessageType: typeof import('./lib/simple.ts').MessageType;
  var dungeon: Record<string, import('./types/connection.js').WaGameRoom>;
}

export {};
