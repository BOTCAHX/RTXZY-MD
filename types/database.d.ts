export interface DbUser {
  [key: string]: any;
  id?: string;
  name?: string;
  banned?: boolean;
  afk?: number;
  afkReason?: string;
  limit?: number;
  money?: number;
  exp?: number;
  level?: number;
  role?: string;
  premium?: boolean;
  premiumTime?: number;
  warn?: number;
  hit?: number;
  registered?: boolean;
}

export interface DbChat {
  [key: string]: any;
  id?: string;
  banned?: boolean;
  mute?: boolean;
  detect?: boolean;
  delete?: boolean;
  sWelcome?: string;
  sBye?: string;
  sPromote?: string;
  sDemote?: string;
  sSubject?: string;
  sIcon?: string;
  sIconDel?: string;
  sRevoke?: string;
  sDesc?: string;
}

export interface DbSticker {
  [key: string]: any;
}

export interface DbStats {
  [key: string]: any;
}

export interface DbMsgs {
  [key: string]: any;
}

/** Content of `db.data` (lowdb). */
export interface DbData {
  users: Record<string, DbUser>;
  chats: Record<string, DbChat>;
  stats: DbStats;
  msgs: DbMsgs;
  guilds?: Record<string, WaGuild>;
  settings?: {
    autoBackup?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** A guild record created by rpgG_* plugins. */
export interface WaGuild {
  name?: string;
  owner?: string;
  members?: string[];
  staff?: string[];
  waitingRoom?: string[];
  level?: number;
  elixir?: number;
  harta?: number;
  eliksir?: number;
  attack?: number;
  exp?: number;
  treasure?: number;
  guardian?: number;
  createdAt?: string;
  id?: string;
  [key: string]: unknown;
}

/** Bot lowdb instance (`global.db`). */
export interface BotDatabase {
  READ?: boolean;
  data: DbData | null;
  chain?: unknown;
  users?: Record<string, DbUser>;
  read(): Promise<void>;
  write(): Promise<void>;
}
