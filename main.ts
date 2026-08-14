import './config.ts';
import NodeCache from 'node-cache';
import WebSocket from 'ws';
import path from 'path';
import fs from 'fs';
import os from 'os';
import yargs from 'yargs/yargs';
import cp from 'child_process';
import _ from 'lodash';
import chalk from 'chalk';
import QRCode from 'qrcode';
import mongoDB from './lib/mongoDB.ts';
import readline from 'readline';
import { pathToFileURL, fileURLToPath } from 'url';
import simple, { generateMessageID } from './lib/simple.ts';
import {
	WaClient,
	createStore,
	createNoopLogger,
	fetchLatestWaWebVersion as zapoFetchLatestWaWebVersion,
} from 'zapo-js';
import { createSqliteStore } from '@zapo-js/store-sqlite';
import { createMediaProcessor } from '@zapo-js/media-utils';
import { EventEmitter } from 'node:events';
import type { WaConnection, WaConnectionOptions, WaConnectionUpdate, WaStoreOptions } from './types/connection.js';

global.mediaProcessor = createMediaProcessor();


async function fetchLatestWaWebVersion() {
	try {
		const { parts } = await zapoFetchLatestWaWebVersion();
		return { version: parts, isLatest: true };
	} catch {
		return { version: [2, 3000, 10179], isLatest: false };
	}
}

function translateMessageEvent(ev) {
	const key = ev.key || {};
	return {
		key: {
			remoteJid: key.remoteJid || ev.chatJid,
			fromMe: !!key.fromMe,
			id: key.id || ev.stanzaId,
			participant: key.participant || ev.participant,
			...(key.isGroup != null ? { isGroup: key.isGroup } : {}),
			...(key.participantAlt ? { participantPn: key.participantAlt } : {}),
			...(key.remoteJidAlt ? { remoteJidPn: key.remoteJidAlt } : {}),
		},
		message: ev.message,
		pushName: ev.pushName,
		messageTimestamp: ev.timestampSeconds ? { low: ev.timestampSeconds } : undefined,
		...(ev.messageStubType != null ? { messageStubType: ev.messageStubType } : {}),
		...(ev.messageStubParameters ? { messageStubParameters: ev.messageStubParameters } : {}),
	};
}

const GROUP_ACTION_MAP = {
	add: 'add',
	remove: 'remove',
	promote: 'promote',
	demote: 'demote',
	linked_group_promote: 'promote',
	linked_group_demote: 'demote',
	invite: 'add',
	change_number: 'remove',
};

const GROUP_STUB_MAP = {
	subject: { type: 21, params: (ev) => [ev.subject] },
	invite: { type: 23, params: (ev) => [ev.code] },
	revoke_invite: { type: 23, params: (ev) => [ev.code] },
	description: { type: 24, params: (ev) => [ev.description] },
	restrict: { type: 25, params: (ev) => [ev.enabled ? 'on' : 'off'] },
	announce: { type: 26, params: (ev) => [ev.enabled ? 'on' : 'off'] },
};

export function makeWASocketBase(connectionOptions: WaConnectionOptions = {}) {
	const logger = connectionOptions.logger || createNoopLogger();
	if (typeof logger.child !== 'function') logger.child = () => logger;


	const authDir = connectionOptions.authDir || connectionOptions.sessionDir || 'sessions';
	if (connectionOptions.store) {
	} else if (connectionOptions.storeFactory) {
		connectionOptions.store = connectionOptions.storeFactory();
	} else {
		fs.mkdirSync(authDir, { recursive: true });
		const storePath = path.join(authDir, 'state.sqlite');
		const backend = createSqliteStore({ path: storePath });
		connectionOptions.store = createStore({
			backends: { sqlite: backend },				providers: {
					auth: 'sqlite',
					signal: 'sqlite',
					preKey: 'sqlite',
					session: 'sqlite',
					identity: 'sqlite',
					senderKey: 'sqlite',
					appState: 'sqlite',
					privacyToken: 'sqlite',
					messages: 'sqlite',
					threads: 'sqlite',
					contacts: 'sqlite',
				} as unknown as WaStoreOptions['providers'],
			} as unknown as WaStoreOptions);
	}

	const version = connectionOptions.version
		? (Array.isArray(connectionOptions.version) ? connectionOptions.version.join('.') : String(connectionOptions.version))
		: undefined;

	const sessionId = connectionOptions.sessionId || connectionOptions.authFile || path.basename(authDir);

	const client = new WaClient(
		{
			store: connectionOptions.store,
			sessionId,
			...(version ? { version } : {}),
			markOnlineOnConnect: connectionOptions.markOnlineOnConnect ?? true,
			...(connectionOptions.keepAliveIntervalMs ? { keepAliveIntervalMs: connectionOptions.keepAliveIntervalMs } : {}),
			...(connectionOptions.deviceBrowser || connectionOptions.browser ? { deviceBrowser: String(connectionOptions.deviceBrowser || connectionOptions.browser).toLowerCase() } : {}),
			...(connectionOptions.recoverFromClientTooOld != null ? { recoverFromClientTooOld: connectionOptions.recoverFromClientTooOld } : {}),
			...(global.mediaProcessor ? { media: { processor: global.mediaProcessor, generateThumbnail: true, generateWaveform: true, normalizeVoiceNote: true } } : {}),
		},
		logger
	);

	const conn = {} as WaConnection;
	conn._client = client;
	conn.ev = new EventEmitter();
	conn.ev.setMaxListeners(0);
	conn.logger = logger;
	conn.isLid = new Map();

	Object.defineProperty(conn, 'user', {
		get() {
			const creds = client.getCredentials();
			if (!creds?.meJid) return null;
			const jid = creds.meJid;
			return {
				id: jid,
				jid,
				name: creds.meDisplayName || creds.pushName || '',
				verifiedName: creds.meDisplayName || '',
				device: jid.split(':')[1],
			};
		},
		configurable: true,
	});

	Object.defineProperty(conn, 'authState', {
		get() {
			const state = client.getState ? client.getState() : { registered: false };
			const creds = client.getCredentials();
			return {
				creds: {
					registered: !!(state?.registered ?? !!creds?.meJid),
					me: creds?.meJid ? { id: creds.meJid, lid: creds.meLid } : undefined,
					meLid: creds?.meLid,
					pushName: creds?.meDisplayName || creds?.pushName,
				},
				keys: {},
			};
		},
		configurable: true,
	});

	conn.ws = {
		readyState: 1, // CONNECTING=0, OPEN=1 (approximation)
		close: () => { void client.disconnect().catch(() => { }); },
	};

	conn.chats = {};

	client.on('connection', (ev) => {
		conn.ws.readyState = ev.status === 'open' ? 1 : (ev.status === 'close' ? 3 : 0);
		if (ev.status === 'open') {
			conn.ev.emit('connection.update', {
				connection: 'open',
				isNewLogin: !!ev.isNewLogin,
				lastDisconnect: undefined,
			});
		} else if (ev.status === 'close') {
			conn.ev.emit('connection.update', {
				connection: 'close',
				isNewLogin: false,
				isLogout: !!ev.isLogout,
				lastDisconnect: {
					error: new Error(ev.reason || 'connection closed'),
					reason: ev.reason,
					code: ev.code,
				},
			});
		} else {
			conn.ev.emit('connection.update', { connection: 'connecting', isNewLogin: false });
		}
	});

	client.on('auth_qr', ({ qr }) => {
		conn.ev.emit('connection.update', { qr });
	});

	client.on('auth_pairing_required', (ev) => {
		client._zapoPairingReady = true;
		conn.ev.emit('connection.update', { pairingRequired: true, forceManual: !!ev?.forceManual });
	});

	client.on('auth_pairing_code', ({ code }) => {
		conn.ev.emit('connection.update', { pairingCode: code });
	});

	client.on('auth_paired', ({ credentials }) => {
		conn.ev.emit('creds.update', credentials);
	});

	client.on('message', (ev) => {
		const wmi = translateMessageEvent(ev);
		conn.ev.emit('messages.upsert', { messages: [wmi], type: 'notify' });

		if (ev.pushName) {
			for (const j of [ev.key?.participantAlt, ev.key?.remoteJidAlt, ev.key?.participant, ev.key?.remoteJid]) {
				if (!j || typeof j !== 'string') continue;
				const jd = conn.decodeJid(j);
				if (!jd || jd.endsWith('@g.us') || jd.endsWith('@broadcast') || jd.endsWith('@newsletter')) continue;
				let c = conn.chats[jd];
				if (!c) c = conn.chats[jd] = { id: jd };
				if (!c.name && !c.notify) c.name = ev.pushName;
			}
		}
		if (ev.key?.fromMe) {
			conn.ev.emit('message_send', { messages: [wmi] });
		}
	});

	client.on('message_protocol', (ev) => {
		const pm = ev.protocolMessage;
		if (!pm) return;
		// REVOKE = 0 in Proto.Message.ProtocolMessage.Type
		if (pm.type === 0) {
			const key = pm.key || {};
			conn.ev.emit('message.delete', {
				remoteJid: key.remoteJid || ev.key?.remoteJid,
				fromMe: !!key.fromMe,
				id: key.id,
				participant: key.participant || ev.key?.participant,
			});
		}
	});

	client.on('group', (ev) => {
		const gid = ev.groupJid || ev.chatJid;
		const action = GROUP_ACTION_MAP[ev.action];
		if (action && ev.participants?.length) {
			conn.ev.emit('group-participants.update', {
				id: gid,
				participants: ev.participants.map((p) => p.jid || p.lidJid || p.phoneJid).filter(Boolean),
				action,
				author: ev.authorJid,
			});
		}
		if (ev.action === 'subject' || ev.action === 'description' || ev.action === 'restrict' || ev.action === 'announce') {
			conn.ev.emit('groups.update', [{
				id: gid,
				...(ev.action === 'subject' ? { subject: ev.subject } : {}),
				...(ev.action === 'description' ? { desc: ev.description } : {}),
				...(ev.action === 'restrict' ? { restrict: ev.enabled } : {}),
				...(ev.action === 'announce' ? { announce: ev.enabled } : {}),
			}]);
		}

		const stub = GROUP_STUB_MAP[ev.action];
		if (!stub && !GROUP_ACTION_MAP[ev.action]) {
		}
		if (stub && gid) {
			conn.ev.emit('messages.upsert', {
				messages: [{
					key: {
						remoteJid: gid,
						fromMe: false,
						id: generateMessageID(),
						...(ev.authorJid ? { participant: ev.authorJid } : {}),
					},
					message: { conversation: '' },
					pushName: '',
					messageTimestamp: { low: Math.floor(Date.now() / 1000) },
					messageStubType: stub.type,
					messageStubParameters: stub.params(ev).filter((p) => p != null),
				}],
				type: 'notify',
			});
		}
	});

	client.on('presence', (ev) => {
		const id = ev.chatJid;
		// attrs from raw stanza: `from` = sender jid, `type` = presence type
		const attrs = ev.rawNode?.attrs || {};
		const sender = attrs.from || id;
		if (!id || !sender) return;
		conn.ev.emit('presence.update', {
			id,
			presences: {
				[sender]: {
					lastKnownPresence: attrs.type || 'available',
					...(ev.lastSeen?.kind === 'timestamp' ? { lastSeen: ev.lastSeen.unixSeconds } : {}),
				},
			},
		});
	});

	client.on('receipt', (ev) => {
		conn.ev.emit('message.receipt.update', ev);
	});

	client.on('chatstate', (ev) => {
		conn.ev.emit('chatstate.update', ev);
	});

	client.on('call', (ev) => {
		conn.ev.emit('call', [{
			id: ev.callId,
			from: ev.callerPnJid || ev.senderLidJid || ev.callCreatorJid,
			status: ev.type, // 'offer' | 'accept' | 'reject' | 'terminate' | ...
			isVideo: ev.isVideo,
			groupJid: ev.groupJid,
			timestamp: ev.timestampSeconds,
		}].filter((c) => c.id && c.from));
	});

	client.on('picture', (ev) => {
		conn.ev.emit('picture.update', ev);
		const gid = ev.chatJid || ev.targetJid;
		if (gid && gid.endsWith('@g.us') && ['set', 'delete', 'set_avatar'].includes(ev.action)) {
			conn.ev.emit('messages.upsert', {
				messages: [{
					key: {
						remoteJid: gid,
						fromMe: false,
						id: generateMessageID(),
						...(ev.authorJid ? { participant: ev.authorJid } : {}),
					},
					message: { conversation: '' },
					pushName: '',
					messageTimestamp: { low: Math.floor(Date.now() / 1000) },
					messageStubType: 22,
					messageStubParameters: [ev.action],
				}],
				type: 'notify',
			});
		}
	});

	const CROCKFORD_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTVWXYZ';
	const sanitizePairingCode = (code) => {
		if (!code) return undefined;
		const stripped = String(code).replace(/-/g, '').toUpperCase().split('').filter((c) => CROCKFORD_ALPHABET.includes(c)).join('');
		return stripped.length === 8 ? stripped : undefined;
	};

	conn.requestPairingCode = async (phoneNumber, customCode) => {
		const state = client.getState ? client.getState() : { registered: false };
		if (!state.registered && !client._zapoPairingReady) {
			void client.connect().catch((e) => logger?.error?.(e));
			await new Promise<void>((resolve) => {
				client.once('auth_pairing_required', () => { client._zapoPairingReady = true; resolve(); });
				setTimeout(resolve, 15000);
			});
		}
		return client.auth.requestPairingCode(String(phoneNumber).replace(/\D/g, ''), false, sanitizePairingCode(customCode));
	};

	conn.connect = () => client.connect();
	conn.disconnect = () => client.disconnect();
	conn.logout = (reason) => client.logout(reason as Parameters<typeof client.logout>[0]);

	

	conn._store = connectionOptions.store;
	conn._sessionId = sessionId;

	void client.connect().catch((e) => logger?.error?.(e));

	return conn;
}

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
// console.log({ opts })

const authFile = `${global.opts._[0] || 'sessions'}`
const storeSqlitePath = path.join(authFile, 'state.sqlite')
global.isInit = !fs.existsSync(storeSqlitePath)
fs.mkdirSync(authFile, { recursive: true })

let waVersion;
try {
	const { version } = await fetchLatestWaWebVersion();
	waVersion = version;
	console.log(chalk.magenta(`-- using WA v${waVersion.join('.')} --`))
} catch (err) {
	waVersion = [2, 3000, 10179]
	console.log(chalk.magenta(`-- using WA v${waVersion.join('.')} (fallback) --`))
}

export const connectionOptions = {
    authDir: authFile,
    sessionId: authFile,
    markOnlineOnConnect: true,
    keepAliveIntervalMs: 10000,
    recoverFromClientTooOld: true,
    browser: 'chrome',
    version: waVersion
}

const __dirname = fileURLToPath(new URL('.', import.meta.url));

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

let low;
try {
	low = await import('lowdb');
} catch (e) {
	const lowdbFallback = './lib/lowdb.js';
	low = await import(lowdbFallback);
}
const { Low, JSONFile } = low;

(async () => {

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) }) as [string, string][]) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
	start: new Date
}

global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

const dbName = `${opts._[0] ? opts._[0] + '_' : ''}database`
const dbDir = path.join(__dirname, 'database')
fs.mkdirSync(dbDir, { recursive: true })
const dbBase = path.join(dbDir, dbName)
global.db = new Low(
	/https?:\/\//.test(opts['db'] || '') ?
		new (await import('./lib/cloudDBAdapter.ts')).default(opts['db']) : /mongodb/.test(opts['db']) ?
			new mongoDB(opts['db']) : /json/i.test(opts['db'] || '') ?
				new JSONFile(`${dbBase}.json`) :
				new (await import('./lib/sqliteDB.ts')).default(`${dbBase}.sqlite`, [`${dbBase}.json`, path.join(__dirname, 'database.json')])
)
global.DATABASE = global.db
global.loadDatabase = async function loadDatabase() {
	if (global.db.READ) return new Promise((resolve) => setInterval(function () { (!global.db.READ ? (clearInterval(this), resolve(global.db.data == null ? global.loadDatabase() : global.db.data)) : null) }, 1 * 1000))
	if (global.db.data !== null) return
	global.db.READ = true
	await global.db.read()
	global.db.READ = false
	global.db.data = {
		users: {},
		chats: {},
		stats: {},
		msgs: {},
		sticker: {},
		...(global.db.data || {})
	}
	global.db.chain = _.chain(global.db.data)
}
loadDatabase()

		
// if (opts['cluster']) {
//	 import './lib/cluster'.Cluster()
// }
global.conn = simple.attach(makeWASocketBase(connectionOptions))

if (!opts['test']) {
	if (global.db) setInterval(async () => {
		if (global.db.data) await global.db.write()
		if (!opts['tmp'] && (global.support || {}).find) {
			let tmp = [os.tmpdir(), 'tmp']
			tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete']))
		}
	}, 30 * 1000)
}

async function connectionUpdate(update) {
	const { connection, lastDisconnect, qr, isLogout } = update
	global.timestamp.connect = new Date

	if (qr && global.useQR) {
		console.log(await QRCode.toString(qr, { type: 'terminal', small: true }))
		console.log(chalk.yellow('\nIf the QR code above is too large or distorted, please click the link below to scan it in your browser:'));
		console.log(chalk.blueBright(`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qr)}\n`));
	}

	if (connection === 'close' && !isLogout && conn.ws.readyState !== WebSocket.CONNECTING) {
		global.reloadHandler(true).catch(console.error)
	}
	if (global.db.data == null) await loadDatabase()
}


const waitAuthLoaded = async (conn, timeoutMs = 12000) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
        if (conn._client?.getCredentials?.()) return true;
        await new Promise((resolve) => setTimeout(resolve, 200));
    }
    return false;
};
await waitAuthLoaded(global.conn);

if (global.conn.authState.creds.registered || global.conn.authState.creds.me) {
    console.log(chalk.green('-- session found, resuming without pairing --'))
}


const sqliteSize = fs.existsSync(storeSqlitePath) ? fs.statSync(storeSqlitePath).size : 0;
if(!global.isInit && sqliteSize === 0 && !global.conn.authState.creds.registered && !global.conn.authState.creds.me) {
    console.log(chalk.yellow('-- state.sqlite is empty (0 bytes), auto reset --'))
    try { global.conn.ws.close() } catch { }
    fs.rmSync(storeSqlitePath, { force: true })
    fs.rmSync(storeSqlitePath + '-shm', { force: true })
    fs.rmSync(storeSqlitePath + '-wal', { force: true })
    global.conn = simple.attach(makeWASocketBase(connectionOptions))
    global.isInit = true
} else if (!global.isInit && sqliteSize > 0 && !global.conn.authState.creds.registered && !global.conn.authState.creds.me) {
    console.log(chalk.yellow('-- state.sqlite exists but no valid credentials --'))
    console.log(chalk.yellow('-- if pairing keeps failing, manually delete the sessions/ folder --'))
}

// Always use pairing code if not registered
if (!conn.authState.creds.registered && !conn.authState.creds.me) {
    if (process.argv.includes('--qr')) {
        global.useQR = true;
        console.log(chalk.blueBright('QR Mode is active. Please scan the QR code that will appear below.'));
        rl.close();
    } else {
        let phoneNumber;
        
        do {
            phoneNumber = await question(chalk.blueBright('ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n'))
            
            if (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10) {
                console.log(chalk.red('Invalid phone number. Please enter a valid number.'))
            }
        } while (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10)
        
        rl.close() 
        phoneNumber = phoneNumber.replace(/\D/g, '')    
        console.log(chalk.bgWhite(chalk.blue('-- Please wait, generating code... --')))    
        setTimeout(async () => {
            let code = await conn.requestPairingCode(phoneNumber)      
            code = code?.match(/.{1,4}/g)?.join('-') || code      
            console.log(
                chalk.black(chalk.bgGreen(`Your Pairing Code : `)), 
                chalk.black(chalk.white(code))
            )
        }, 3000)
    }
}

process.on('uncaughtException', console.error)
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

const imports = async (filePath) => {
	let resolvedPath = path.resolve(filePath);
	if (!fs.existsSync(resolvedPath) && filePath.endsWith('.ts')) {
		resolvedPath = path.resolve(filePath.slice(0, -3) + '.js');
	}
	const module = await import(pathToFileURL(resolvedPath).href + '?update=' + Date.now());
	return module.default || module;
}
let isInit = true
global.reloadHandler = async function (restatConn) {
	let handler = await imports('./handler.ts')
	const oldConn = global.conn
	if (restatConn) {
		try { oldConn.ws.close() } catch { }
		global.conn = simple.attach(makeWASocketBase(connectionOptions))
	}

	if (!isInit && oldConn.ev) {
		oldConn.ev.off('messages.upsert', oldConn.handler)
		oldConn.ev.off('group-participants.update', oldConn.participantsUpdate)
		oldConn.ev.off('message.delete', oldConn.onDelete)
		oldConn.ev.off('connection.update', oldConn.connectionUpdate)
		oldConn.ev.off('creds.update', oldConn.credsUpdate)
	}

    conn.welcome = 'Selamat datang @user di group @subject utamakan baca desk ya \n@desc'
    conn.bye = 'Selamat tinggal @user 👋'
	conn.promote = '@user sekarang admin!'
	conn.demote = '@user sekarang bukan admin!'
	conn.handler = handler.handler.bind(conn)
	conn.participantsUpdate = handler.participantsUpdate.bind(conn)
	conn.onDelete = handler.delete.bind(conn)
	conn.connectionUpdate = connectionUpdate.bind(conn)
	conn.credsUpdate = async () => {}

	conn.ev.on('messages.upsert', conn.handler)
	conn.ev.on('group-participants.update', conn.participantsUpdate)
	conn.ev.on('message.delete', conn.onDelete)
	conn.ev.on('connection.update', conn.connectionUpdate)
	conn.ev.on('creds.update', conn.credsUpdate)
	isInit = false
	return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.ts$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
	try {
		const module = await import(pathToFileURL(path.join(pluginFolder, filename)).href + '?update=' + Date.now())
		global.plugins[filename] = module.default || module
	} catch (e) {
		conn.logger.error(e)
		delete global.plugins[filename]
	}
}
console.log(Object.keys(global.plugins))
global.reload = async (_ev, filename) => {
	if (pluginFilter(filename)) {
		let dir = path.join(pluginFolder, filename)
		if (fs.existsSync(dir)) {
			conn.logger.info(`reloading plugin '${filename}'`)
		} else {
			conn.logger.warn(`deleted plugin '${filename}'`)
			return delete global.plugins[filename]
		}
		try {
			const module = await import(pathToFileURL(dir).href + '?update=' + Date.now())
			global.plugins[filename] = module.default || module
		} catch (e) {
			conn.logger.error(e)
		} finally {
			global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
		}
	}
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
await global.reloadHandler()

// Quick Test
async function _quickTest() {
	let test = await Promise.all([
		cp.spawn('ffmpeg'),
		cp.spawn('ffprobe'),
		cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
		cp.spawn('convert'),
		cp.spawn('magick'),
		cp.spawn('gm'),
		cp.spawn('find', ['--version'])
	].map(p => {
		return Promise.race([
			new Promise<boolean>(resolve => {
				p.on('close', code => {
					resolve(code !== 127)
				})
			}),
			new Promise<boolean>(resolve => {
				p.on('error', _ => resolve(false))
			})
		])
	}))
	let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
	console.log(test)
	let s = global.support = {
		ffmpeg,
		ffprobe,
		ffmpegWebp,
		convert,
		magick,
		gm,
		find
	}
	Object.freeze(global.support)

	if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
	if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
	if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
	.then(() => conn.logger.info('Quick Test Done'))
	.catch(() => {})
})()

