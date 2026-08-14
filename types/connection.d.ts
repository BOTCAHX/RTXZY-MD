import type { WaClient } from 'zapo-js';
import type { EventEmitter } from 'node:events';

export interface WaUser {
  id: string;
  jid: string;
  name: string;
  verifiedName: string;
  device: string | undefined;
}

export interface WaAuthStateCreds {
  registered: boolean;
  me?: { id: string; lid?: string };
  meLid?: string;
  pushName?: string;
}

export interface WaAuthState {
  creds: WaAuthStateCreds;
  keys: Record<string, unknown>;
}

export interface WaConnectionUpdate {
  connection: 'open' | 'close' | 'connecting';
  isNewLogin?: boolean;
  isLogout?: boolean;
  lastDisconnect?: {
    error: Error;
    reason?: string;
    code?: number;
  };
  qr?: string;
  pairingRequired?: boolean;
  forceManual?: boolean;
  pairingCode?: string;
}

export interface WaQuotedMessage {
  videoMessage?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface WaExtendedTextMessage {
  text?: string;
  contextInfo?: {
    quotedMessage?: WaQuotedMessage;
    mentionedJid?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/** WhatsApp message serialized via simple.smsg. */
export interface WaMessage {
  id?: string;
  name?: string;
  from?: string;
  caption?: string;
  contentText?: string;
  description?: string;
  seconds?: number;
  fileSha256?: Buffer | Uint8Array | string;
  isLottie?: boolean;
  isAnimated?: boolean;
  vM?: WaMessage;
  exp?: number;
  contextInfo?: {
    mentionedJid?: string[];
    [key: string]: unknown;
  };
  fakeObj?: unknown;
  messageTimestamp?: string | number;
  key?: {
    remoteJid?: string;
    fromMe?: boolean;
    id?: string;
    participant?: string;
    participantPn?: string;
    remoteJidPn?: string;
    senderPn?: string;
    senderLid?: string;
    isGroup?: boolean;
    [key: string]: unknown;
  };
  message?: {
    extendedTextMessage?: WaExtendedTextMessage;
    conversation?: string;
    imageMessage?: { caption?: string; url?: string; mimetype?: string; [key: string]: unknown };
    videoMessage?: { caption?: string; url?: string; mimetype?: string; [key: string]: unknown };
    audioMessage?: { seconds?: number; url?: string; mimetype?: string; [key: string]: unknown };
    buttonsResponseMessage?: { selectedButtonId?: string; [key: string]: unknown };
    listResponseMessage?: { singleSelectReply?: { selectedRowId?: string; [key: string]: unknown }; [key: string]: unknown };
    templateButtonReplyMessage?: { selectedId?: string; [key: string]: unknown };
    groupStatusMentionMessage?: Record<string, unknown>;
    protocolMessage?: { type?: number; [key: string]: unknown };
    senderKeyDistributionMessage?: { groupId?: string; [key: string]: unknown };
    [key: string]: unknown;
  } | null;
  msg?: {
    mimetype?: string;
    seconds?: number;
    mediaType?: string;
    url?: string;
    fileSha256?: unknown;
    isLottie?: boolean;
    isAnimated?: boolean;
    vM?: unknown;
    caption?: string;
    description?: string;
    name?: string;
    contextInfo?: { stanzaId?: string; participant?: string; [key: string]: unknown };
    [key: string]: unknown;
  };
  /** Media metadata for sticker/video messages (serialized from msg). */
  media?: {
    mimetype?: string;
    seconds?: number;
    mediaType?: string;
    url?: string;
    fileSha256?: unknown;
    isLottie?: boolean;
    isAnimated?: boolean;
    vM?: unknown;
    caption?: string;
    description?: string;
    name?: string;
    [key: string]: unknown;
  };
  pushName?: string;
  sender?: string;
  chat?: string;
  participant?: string;
  isGroup?: boolean;
  isBaileys?: boolean;
  isZapo?: boolean;
  isCommand?: boolean;
  fromMe?: boolean;
  mtype?: string;
  mediaType?: string;
  mimetype?: string;
  url?: string;
  directPath?: string;
  mediaKey?: string;
  mentionedJid?: string[];
  messageStubType?: number;
  messageStubParameters?: string[];
  text?: string;
  quoted?: WaMessage | null;
  plugin?: string;
  error?: unknown;
  limit?: boolean | number;
  download?: (saveToFile?: boolean) => Promise<Buffer | string | null>;
  reply?: (text: string, chatId?: string | Record<string, unknown>, options?: unknown) => Promise<unknown>;
  getQuotedObj?: () => Promise<WaMessage | null>;
  getQuotedMessage?: () => Promise<WaMessage | null>;
  copy?: () => WaMessage;
  forward?: (jid?: string, forceForward?: boolean) => Promise<unknown>;
  copyNForward?: (jid?: string, forceForward?: boolean, options?: Record<string, unknown>) => Promise<unknown>;
  cMod?: (jid: string, text?: string, sender?: string, options?: Record<string, unknown>) => Promise<unknown>;
  delete?: () => Promise<unknown>;
}

export interface WaGroupMetadata {
  id: string;
  subject: string;
  owner?: string;
  desc?: string;
  descId?: string;
  restrict?: boolean;
  announce?: boolean;
  ephemeral?: number;
  size?: number;
  creation?: number;
  participants?: Array<{ id?: string; jid?: string; isAdmin?: boolean; isSuperAdmin?: boolean; admin?: string | null; phoneNumber?: string; [key: string]: unknown }>;
}

export type WaStoreOptions = Parameters<typeof import('zapo-js').createStore>[0];

export interface WaConnectionOptions {
  logger?: import('zapo-js').Logger;
  authDir?: string;
  sessionDir?: string;
  sessionId?: string;
  authFile?: string;
  store?: import('zapo-js').WaStore;
  storeFactory?: () => import('zapo-js').WaStore;
  version?: number[] | string;
  markOnlineOnConnect?: boolean;
  keepAliveIntervalMs?: number;
  deviceBrowser?: string;
  browser?: string;
  recoverFromClientTooOld?: boolean;
}

/** TicTacToe room game (from lib/tictactoe.ts). */
export interface WaTicTacToeLike {
  playerX?: string;
  playerO?: string;
  _currentTurn?: boolean;
  readonly currentTurn?: string;
  readonly winner?: string;
  readonly board?: number;
  turn?(player?: number, x?: number, y?: number): number;
  render?(): number[];
  [key: string]: unknown;
}

/** Dungeon co-op room game state. */
export interface WaDungeonGame {
  player1?: string;
  player2?: string;
  player3?: string;
  player4?: string;
  turn?: number;
  siapa?: string;
  healt?: number;
  sword?: number;
  sworddurability?: number;
  money?: number;
  exp?: number;
  sampah?: number;
  diamond?: number;
  makananPet?: number;
  common?: number;
  uncommon?: number;
  mythic?: number;
  legendary?: number;
  pet?: number;
  potion?: number;
  iron?: number;
  kayu?: number;
  batu?: number;
  string?: number;
  [key: string]: unknown;
}

export type WaRoomGame = WaTicTacToeLike & WaDungeonGame;

/**
 * A single game room / session stored in `conn.<gameName>` maps.
 * Properties are optional because every plugin shapes its rooms differently.
 */
export interface WaGameRoom {
  id?: string;
  name?: string;
  state?: string;
  chat?: unknown;
  status?: string | boolean;
  type?: string;
  player?: string[];
  player1?: string;
  player2?: string;
  player3?: string;
  player4?: string;
  p?: string;
  p2?: string;
  a?: string;
  b?: string;
  x?: string;
  o?: string;
  curr?: string;
  kata?: string;
  asal?: string;
  winner?: string;
  dari?: string;
  pesan?: string;
  Lv?: number;
  Uang?: number;
  Pencuri_Tertangkap?: number;
  Waktu_Tertangkap?: number;
  Kaca_Pembesar?: number;
  Level?: number;
  State?: string | number;
  ThiefAction?: string;
  Balance?: number;
  Pasien_Sembuh?: number;
  Waktu_Sembuh?: number;
  Obat_Super?: number;
  msg_old?: WaMessage;
  subject?: string;
  originalName?: string;
  processedBy?: string;
  startTime?: number;
  startedAt?: number;
  game?: WaRoomGame;
  waktu?: ReturnType<typeof setTimeout>;
  waktu_list?: ReturnType<typeof setTimeout>;
  timeout?: ReturnType<typeof setTimeout>;
  cooldown?: number | null;
  time?: string;
  date?: number;
  turn?: number;
  host?: string;
  spin?: string;
  taruhan?: number;
  price?: { money?: number; exp?: number; sampah?: number; potion?: number; diamond?: number; iron?: number; kayu?: number; batu?: number; string?: number; common?: number; uncommon?: number; mythic?: number; legendary?: number; pet?: number; makananPet?: number; [key: string]: unknown };
  win_point?: number;
  score?: string | number;
  win?: string | number;
  killer?: string;
  new?: boolean;
  diam?: boolean;
  basi?: string[];
  split?: unknown;
  less?: { healt?: number; sword?: number; [key: string]: unknown };
  eliminated?: string[];
  owner?: string;
  jawaban?: string[];
  terjawab?: string[];
  soal?: string;
  msg?: WaMessage | { key?: { id?: string; [key: string]: unknown }; [key: string]: unknown } | null;
  rewardAmount?: string | number;
  areas?: { area?: string; txt?: string; reward?: { exp?: number; loot?: Record<string, number>; resources?: Record<string, number> } }[];
  currentArea?: number;
  images?: string[];
  hasilPetualangan?: number;
  hasilTambang?: number;
  lastPetualanganTime?: number;
  totalReward?: { potion?: number; diamond?: number; emas?: number; money?: number; limit?: number; [key: string]: unknown };
  playerPosition?: number;
  criminalPosition?: number;
  oldkey?: unknown;
  earnedExp?: number;
  earnedMoney?: number;
  sender?: string;
  roomId?: string;
  moveCount?: number;
  maxMoves?: number;
  key?: unknown;
  check?: (sender: string) => boolean;
  other?: (sender: string) => string;
  filter?: (word: string) => string;
  /** Some plugins store rooms as tuples: [message, questionData, points, timeout]. */
  0?: WaMessage | null;
  1?: {
    jawaban?: string;
    Jawaban?: string;
    answer?: string;
    kepanjangan?: string;
    jawabanAsli?: string;
    bonus?: number;
    money?: number;
    time?: number;
    pilihan?: string[];
    soal?: string;
    deskripsi?: string;
    img?: string;
    Img?: string;
    imgFilter?: string;
    fullimg?: string;
    clue?: string;
    state?: string;
    nama?: string;
    judul?: string;
    lambang?: string;
    result?: { name?: string; desc?: string; image?: string; [key: string]: unknown };
    data?: { jawaban?: string; [key: string]: unknown };
    [key: string]: unknown;
  };
  2?: number;
  3?: ReturnType<typeof setTimeout>;
  [index: number]: unknown;
  [key: string]: unknown;
}

/** Game room collection keyed by chat/sender id. */
export type WaGameCollection = Record<string, WaGameRoom>;

/** Per-sender AI session state (conn.selfai / conn.sessionAI). */
export interface WaAiSession {
  sessionChat?: string[];
  pesan?: string[];
  timeout?: ReturnType<typeof setTimeout>;
}

/** Temp-mail session state (conn.sessionsMail). */
export interface WaMailSession {
  email?: string;
  lastCheckedAt?: number;
  [key: string]: unknown;
}

/** One werewolf room player entry (game-wwgc.ts). */
export interface WaWerewolfPlayer {
  id: string;
  number: number;
  sesi?: string;
  role?: string | boolean;
  effect?: string[];
  vote?: number;
  isdead?: boolean;
  isvote?: boolean;
  [key: string]: unknown;
}

/**
 * Bot connection — methods mirror the helpers attached in lib/simple.ts
 * (conn.<method> = ... inside `attach()`), plus game-state maps used by plugins.
 */
export interface WaConnection {
  _client: WaClient;
  _store?: import('zapo-js').WaStore;
  _sessionId: string;
  _zapoPairingReady?: boolean;
  ev: EventEmitter;
  logger: {
    info?(...args: unknown[]): void;
    warn?(...args: unknown[]): void;
    error?(...args: unknown[]): void;
    child?(...args: unknown[]): unknown;
  };
  isLid: { set(k: string, v: string): unknown; get(k: string): string | undefined; has(k: string): boolean };
  _lidMiss?: Set<unknown>;
  user: WaUser | null;
  authState: WaAuthState;
  withoutContact?: boolean;
  _contactName?: (jid?: string) => Promise<string | undefined>;
  ws: {
    readyState: number;
    close(): void;
  };
  chats: Record<string, { id?: string; name?: string; notify?: string; isChats?: boolean; metadata?: { read_only?: boolean; announce?: boolean; id?: string; [key: string]: unknown }; [key: string]: unknown }>;
  msgqueque?: unknown[];
  welcome?: string;
  bye?: string;
  promote?: string;
  demote?: string;
  sSubject?: string;
  sIcon?: string;
  sIconDel?: string;
  sRevoke?: string;
  sDesc?: string;
  spromote?: string;
  sdemote?: string;
  handler?: (...args: unknown[]) => unknown;
  participantsUpdate?: (...args: unknown[]) => unknown;
  onDelete?: (...args: unknown[]) => unknown;
  connectionUpdate?: (update: WaConnectionUpdate) => void;
  credsUpdate?: (...args: unknown[]) => unknown;
  _delCache?: Map<string, number>;

  // --- game state maps (per-plugin rooms) ---
  adventure?: WaGameCollection;
  anonymous?: WaGameCollection;
  asahotak?: WaGameCollection;
  battlepet?: WaGameCollection;
  bomb?: WaGameCollection;
  family?: WaGameCollection;
  fisika?: WaGameCollection;
  game?: WaGameCollection;
  giveway?: WaGameCollection;
  hartatahta?: WaGameCollection;
  judi?: WaGameCollection;
  judipvp?: WaGameCollection;
  kimia?: WaGameCollection;
  koboy?: WaGameCollection;
  math?: WaGameCollection;
  absen?: WaGameCollection;
  beautifulMeme?: WaGameCollection;
  orders?: Record<string, Record<string, WaGameRoom>>;
  singkatan?: WaGameCollection;
  spam?: Record<string, number[]>;
  groupStatus?: WaGameCollection;
  casino?: WaGameCollection;
  players?: WaGameCollection;
  playerr?: WaGameCollection;
  prefix?: WaGameCollection;
  anticall?: boolean;
  menfess?: WaGameCollection;
  merdeka?: WaGameCollection;
  misi?: WaGameCollection;
  siapakahaku?: WaGameCollection;
  skata?: WaGameCollection;
  susun?: WaGameCollection;
  tambang?: WaGameCollection;
  tbkata?: WaGameCollection;
  tekateki?: WaGameCollection;
  ulartangga?: WaGameCollection;
  werewolf?: Record<string, WaGameRoom & { player: WaWerewolfPlayer[] }>;
  tebakanime?: WaGameCollection;
  tebakbendera2?: WaGameCollection;
  tebakbola?: WaGameCollection;
  tebakbuah?: WaGameCollection;
  tebakchara?: WaGameCollection;
  tebakclub?: WaGameCollection;
  tebakdrakor?: WaGameCollection;
  tebakemoji?: WaGameCollection;
  tebakff?: WaGameCollection;
  tebakgambar?: WaGameCollection;
  tebakgenshin?: WaGameCollection;
  tebakhewan?: WaGameCollection;
  tebakislami?: WaGameCollection;
  tebakjenaka?: WaGameCollection;
  tebakjkt?: WaGameCollection;
  tebakkalimat?: WaGameCollection;
  tebakkode?: WaGameCollection;
  tebakkpop?: WaGameCollection;
  tebaklagu?: WaGameCollection;
  tebaklirik?: WaGameCollection;
  tebaklogo?: WaGameCollection;
  tebakmakanan?: WaGameCollection;
  tebakmeme?: WaGameCollection;
  tebakml?: WaGameCollection;
  tebaknegara?: WaGameCollection;
  tebakpokemon?: WaGameCollection;
  tebakpresiden?: WaGameCollection;
  tebaktebakan?: WaGameCollection;
  tebaktempat?: WaGameCollection;
  tebaktokoh?: WaGameCollection;
  tebakwallet?: WaGameCollection;

  // --- plugin helper state ---
  selfai?: Record<string, WaAiSession>;
  sessionAI?: Record<string, WaAiSession>;
  sessionsMail?: Record<string, WaMailSession>;
  btch?: Record<string, WaAiSession>;

  // --- connection ---
  connect(): Promise<unknown>;
  disconnect(): Promise<unknown>;
  logout(reason?: string): Promise<unknown>;
  requestPairingCode(phoneNumber: string, customCode?: string): Promise<string>;

  // --- jid / contact ---
  decodeJid(jid: string): string;
  getJid(jid: string): string;
  getJidAsync(jid: string, hintChat?: string): Promise<string>;
  getName(jid?: string, withoutContact?: boolean): Promise<string>;
  onWhatsApp(jids: string | string[]): Promise<Array<{ exists: boolean; jid?: string }>>;
  toMentionJid(jid: string | string[]): string | null;
  profilePictureUrl(jid: string, type?: string, timeoutMs?: number): Promise<string>;
  getProfilePicture(jid: string, type?: string): Promise<Buffer | string>;
  getBusinessProfile(jid: string): Promise<{ wid?: string; website?: string; timezone?: string; email?: string; category?: string; address?: string; description?: string; business_hours?: { timezone?: string; [key: string]: unknown }; [key: string]: unknown }>;
  parseMention(text: string): string[];
  normalizeMentionText(text: string): unknown;
  filter(text: string): string;
  format(...args: unknown[]): string;
  msToDate(ms: number): string;
  delay(ms: number): Promise<void>;
  waitEvent(eventName: string, is?: () => boolean, maxTries?: number): Promise<unknown[]>;
  query(node: unknown, timeoutMs?: number): Promise<unknown>;
  rand<T = unknown>(isi: T[]): Promise<T>;

  // --- messages ---
  sendMessage(jid: string, content: string | Record<string, unknown>, options?: Record<string, unknown> | string | WaMessage | null, extra?: WaMessage | null): Promise<{ key?: { remoteJid?: string; fromMe?: boolean; id?: string; participant?: string; [key: string]: unknown }; [key: string]: unknown }>;
  sendFile(jid: string, path: string | Buffer, filename?: string, caption?: string, quoted?: unknown, ptt?: boolean | number | Record<string, unknown>, options?: Record<string, unknown>): Promise<unknown>;
  sendMedia(jid: string, path: string | Buffer, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendText(jid: string, text: string, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendTextWithMentions(jid: string, text: string, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  reply(jid: string, text?: string, quoted?: unknown, options?: boolean | Record<string, unknown>, contextInfo?: Record<string, unknown>): Promise<WaMessage | null>;
  sendReadReceipt(jid: string, participant: string | null, ids: string[]): Promise<unknown>;
  sendPresenceUpdate(type: string, jid?: string): Promise<unknown>;
  sendContact(jid: string, data: Array<[string, string]>, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendBut(jid: string, content: string, footer: string, button1: string, row1: string, quoted?: unknown): Promise<unknown>;
  send2But(jid: string, content: string, footer: string, button1: string, row1: string, button2: string, row2: string, quoted?: unknown): Promise<unknown>;
  sendButton(jid: string, contentText: string, footer: string, buffer: Buffer | string, buttons: Array<[string, string]>, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendButtonImg(jid: string, buffer: Buffer | string, contentText: string, footerText: string, button1: string, id1: string, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  send2ButtonImg(jid: string, buffer: Buffer | string, contentText: string, footerText: string, button1: string, id1: string, button2: string, id2: string, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendButtonVid(jid: string, buffer: Buffer | string, contentText: string, footerText: string, button1: string, id1: string, quoted?: unknown, options?: Record<string, unknown>): Promise<unknown>;
  sendHButt(jid: string, content: string, distek: string, link: string, discall: string, number: string, retek: string, id: string, quoted?: unknown): Promise<unknown>;
  sendHButtonLoc(jid: string, buffer: Buffer | string, content: string, footer: string, distek: string, link1: string, quick1: string, id1: string, quoted?: unknown): Promise<unknown>;
  sendImageAsSticker(jid: string, path: string | Buffer, quoted?: unknown, options?: Record<string, unknown>): Promise<Buffer>;
  sendVideoAsSticker(jid: string, path: string | Buffer, quoted?: unknown, options?: Record<string, unknown>): Promise<Buffer>;
  copyNForward(jid: string, message: unknown, forwardingScore?: boolean, options?: Record<string, unknown>): Promise<unknown>;
  forwardMessage(jid: string, message: unknown, forceForward?: boolean): Promise<unknown>;
  fakeReply(jid: string, text?: string, fakeJid?: string, fakeText?: string, fakeGroupJid?: string | false, options?: Record<string, unknown>): Promise<unknown>;
  cMod(jid: string, message: unknown, text?: string, sender?: string, options?: Record<string, unknown>): Promise<unknown>;
  cMods(jid: string, message: WaMessage, text?: string, sender?: string, options?: Record<string, unknown>): unknown;
  relayMessage(jid: string, message: unknown, options?: Record<string, unknown>): Promise<unknown>;
  relayWAMessage(message: unknown, options?: Record<string, unknown>): Promise<unknown>;
  prepareMessageFromContent(jid: string, content: unknown, options?: Record<string, unknown>): Promise<unknown>;
  chatRead(jid: string, participant?: string, messageID?: string): Promise<unknown>;
  chatModify(mods: { delete?: boolean; clear?: boolean; [key: string]: unknown } | null | undefined, jid: string): Promise<unknown>;
  fetchBlocklist(): Promise<string[]>;
  fetchStatus(jid: string): Promise<{ status?: string; setAt?: number; [key: string]: unknown } | null>;
  updateBlockStatus(jid: string, action: string): Promise<unknown>;
  rejectCall(callId: string, from: string): Promise<unknown>;

  // --- group ---
  groupMetadata(jid: string): Promise<WaGroupMetadata | null>;
  groupFetchAllParticipating(): Promise<Record<string, WaGroupMetadata>>;
  groupParticipantsUpdate(jid: string, participants: string[], action: string): Promise<unknown>;
  groupRequestParticipantsList(jid: string): Promise<unknown>;
  groupRequestParticipantsUpdate(jid: string, participants: string[], action: string): Promise<unknown>;
  groupSettingUpdate(jid: string, setting: string): Promise<unknown>;
  groupInviteCode(jid: string): Promise<string | null>;
  groupRevokeInvite(jid: string): Promise<string | undefined>;
  groupAcceptInvite(code: string): Promise<unknown>;
  groupCreate(subject: string, participants?: string[], options?: Record<string, unknown>): Promise<WaGroupMetadata | { id?: string; [key: string]: unknown }>;
  groupLeave(jids: string | string[]): Promise<unknown>;
  groupUpdateSubject(jid: string, subject: string): Promise<unknown>;
  groupUpdateDescription(jid: string, desc?: string | null): Promise<unknown>;
  groupToggleEphemeral(jid: string, ephemeral?: number): Promise<unknown>;

  // --- media ---
  getFile(PATH: string | Buffer, returnAsFilename?: boolean): Promise<{ res?: { status?: number; [key: string]: unknown }; buffer?: Buffer; data?: Buffer; filename?: string; mime?: string; ext?: string; size?: number; [key: string]: unknown }>;
  getBuffer(url: string, options?: Record<string, unknown>): Promise<Buffer>;
  resize(buffer: Buffer | string, uk1: number, uk2: number): Promise<Buffer>;
  downloadM(m: WaMessage, type?: string, saveToFile?: boolean): Promise<Buffer | string | null>;
  downloadContentFromMessage(m: unknown, type?: string, saveToFile?: boolean): Promise<Buffer | string | null>;
  downloadAndSaveMediaMessage(message: WaMessage, filename?: string, attachExtension?: boolean): Promise<string>;
  serializeM(m: unknown): WaMessage;
  pushMessage(m: WaMessage | WaMessage[]): Promise<unknown>;
  loadMessage(messageID: string): Promise<unknown>;
  insertAllGroup(): Promise<unknown>;
  processMessageStubType(m: WaMessage): Promise<unknown>;  waUploadToServer(content: { mimetype?: string; [key: string]: unknown }): Promise<unknown>;
}
