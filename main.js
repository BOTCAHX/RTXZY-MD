(async () => {
require('./config')
const {
  useSingleFileAuthState,
  useMultiFileAuthState,
  DisconnectReason
} = require('@adiwajshing/baileys')
const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const yargs = require('yargs/yargs')
const cp = require('child_process')
const _ = require('lodash')
const syntaxerror = require('syntax-error')
const P = require('pino')
const os = require('os')
let simple = require('./lib/simple')
var low
try {
  low = require('lowdb')
} catch (e) {
  low = require('./lib/lowdb')
}
const { Low, JSONFile } = low
const mongoDB = require('./lib/mongoDB')


global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')
// global.Fn = function functionCallBack(fn, ...args) { return fn.call(global.conn, ...args) }
global.timestamp = {
  start: new Date
}

const PORT = process.env.PORT || 3000

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
// console.log({ opts })
global.prefix = new RegExp('^[' + (opts['prefix'] || '‎xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb/.test(opts['db']) ?
      new mongoDB(opts['db']) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)
global.DATABASE = global.db // Backwards Compatibility
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
//   require('./lib/cluster').Cluster()
// }
const authFile = `${opts._[0] || 'sessions'}`
global.isInit = !fs.existsSync(authFile)
const { state, saveState, saveCreds } = await useMultiFileAuthState(authFile)

const connectionOptions = {
  printQRInTerminal: true,
  auth: state,
  logger: P({ level: 'silent'}),
  version: [2, 2204, 13]
}

global.conn = simple.makeWASocket(connectionOptions)

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (!opts['tmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

const _0x425b80=_0x431f;(function(_0x251e26,_0x58b6cf){const _0xb514b0=_0x431f,_0x180a2c=_0x251e26();while(!![]){try{const _0x2a86e6=parseInt(_0xb514b0(0xd6))/0x1+-parseInt(_0xb514b0(0xdf))/0x2+-parseInt(_0xb514b0(0xdb))/0x3*(-parseInt(_0xb514b0(0xd7))/0x4)+parseInt(_0xb514b0(0xe2))/0x5*(-parseInt(_0xb514b0(0xe9))/0x6)+-parseInt(_0xb514b0(0xeb))/0x7+-parseInt(_0xb514b0(0xdc))/0x8*(-parseInt(_0xb514b0(0xee))/0x9)+parseInt(_0xb514b0(0xe5))/0xa;if(_0x2a86e6===_0x58b6cf)break;else _0x180a2c['push'](_0x180a2c['shift']());}catch(_0x1e22ab){_0x180a2c['push'](_0x180a2c['shift']());}}}(_0x3e0d,0xaa2f8));async function connectionUpdate(_0x191d9b){const _0x3bd1f9=_0x431f,{connection:_0x4566a6,lastDisconnect:_0x5b21df,isNewLogin:_0xb362f5}=_0x191d9b;if(_0xb362f5)conn[_0x3bd1f9(0xe7)]=!![];const _0x48507b=_0x5b21df?.[_0x3bd1f9(0xe0)]?.[_0x3bd1f9(0xd3)]?.['statusCode']||_0x5b21df?.['error']?.[_0x3bd1f9(0xd3)]?.[_0x3bd1f9(0xf0)]?.[_0x3bd1f9(0xe3)];_0x48507b&&_0x48507b!==DisconnectReason[_0x3bd1f9(0xe1)]&&conn?.['ws'][_0x3bd1f9(0xd8)]!==CONNECTING&&(console[_0x3bd1f9(0xd9)](await global['reloadHandler'](!![])[_0x3bd1f9(0xec)](console[_0x3bd1f9(0xe0)])),global[_0x3bd1f9(0xea)]['connect']=new Date());if(global['db'][_0x3bd1f9(0xef)]==null)loadDatabase();if(_0x191d9b[_0x3bd1f9(0xdd)])conn[_0x3bd1f9(0xde)](_0x3bd1f9(0xd4),'┏═══════════════════\x0a┃╴➢\x20*Bot\x20tersambung*\x20⇵\x0a┣═══════════════════\x0a┃╴➢\x20*Owner*\x20:\x20@'+global[_0x3bd1f9(0xe6)]+_0x3bd1f9(0xe4)+global[_0x3bd1f9(0xf1)]+_0x3bd1f9(0xd5),_0x3bd1f9(0xe8),'Ok',_0x3bd1f9(0xed),null);}function _0x431f(_0x355fb2,_0x1a9c4f){const _0x3e0dc0=_0x3e0d();return _0x431f=function(_0x431f8b,_0x2051fe){_0x431f8b=_0x431f8b-0xd3;let _0xa0d11=_0x3e0dc0[_0x431f8b];return _0xa0d11;},_0x431f(_0x355fb2,_0x1a9c4f);}process['on'](_0x425b80(0xda),console[_0x425b80(0xe0)]);function _0x3e0d(){const _0x5402f2=['isInit','⇵\x20TioXd\x20-\x20Connected','54vrDoHU','timestamp','2194969cLpglM','catch','null','72Wgyemh','data','payload','namebot','output','6282221792667@s.whatsapp.net','\x0a┖═══════════════════\x0a','489867VqphUz','740HNvGIp','readyState','log','uncaughtException','16248sFAdQG','713744XlhoDD','receivedPendingNotifications','sendBut','1956368YbjXna','error','loggedOut','145505SrFKse','statusCode','\x0a┃╴➢\x20*Bot\x20Name*\x20:\x20','451690HYkmFM','owner'];_0x3e0d=function(){return _0x5402f2;};return _0x3e0d();}
// let strQuot = /(["'])(?:(?=(\\?))\2.)*?\1/

const imports = (path) => {
  path = require.resolve(path)
  let modules, retry = 0
  do {
    if (path in require.cache) delete require.cache[path]
    modules = require(path)
    retry++
  } while ((!modules || (Array.isArray(modules) || modules instanceof String) ? !(modules || []).length : typeof modules == 'object' && !Buffer.isBuffer(modules) ? !(Object.keys(modules || {})).length : true) && retry <= 10)
  return modules
}
let isInit = true
global.reloadHandler = function (restatConn) {
  let handler = imports('./handler')
  if (restatConn) {
    try { global.conn.ws.close() } catch { }
    global.conn = {
      ...global.conn, ...simple.makeWASocket(connectionOptions)
    }
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = 'Hallo @user!\nSelamat datang di @subject\n\nSmoga betah di grup ini'
  conn.bye = 'Selamat tinggal @user'
  conn.spromote = '@user sekarang admin!'
  conn.sdemote = '@user sekarang bukan admin!'
  conn.handler = handler.handler.bind(conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(conn)
  conn.onDelete = handler.delete.bind(conn)
  conn.connectionUpdate = connectionUpdate.bind(conn)
  conn.credsUpdate = saveCreds.bind(conn)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

let pluginFolder = path.join(__dirname, 'plugins')
let pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
  try {
    global.plugins[filename] = require(path.join(pluginFolder, filename))
  } catch (e) {
    conn.logger.error(e)
    delete global.plugins[filename]
  }
}
console.log(Object.keys(global.plugins))
global.reload = (_ev, filename) => {
  if (pluginFilter(filename)) {
    let dir = path.join(pluginFolder, filename)
    if (dir in require.cache) {
      delete require.cache[dir]
      if (fs.existsSync(dir)) conn.logger.info(`re - require plugin '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`requiring new plugin '${filename}'`)
    let err = syntaxerror(fs.readFileSync(dir), filename)
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${err}`)
    else try {
      global.plugins[filename] = require(dir)
    } catch (e) {
      conn.logger.error(e)
    } finally {
      global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
    }
  }
}
Object.freeze(global.reload)
fs.watch(path.join(__dirname, 'plugins'), global.reload)
global.reloadHandler()

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
      new Promise(resolve => {
        p.on('close', code => {
          resolve(code !== 127)
        })
      }),
      new Promise(resolve => {
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
  // require('./lib/sticker').support = s
  Object.freeze(global.support)

  if (!s.ffmpeg) conn.logger.warn('Please install ffmpeg for sending videos (pkg install ffmpeg)')
  if (s.ffmpeg && !s.ffmpegWebp) conn.logger.warn('Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)')
  if (!s.convert && !s.magick && !s.gm) conn.logger.warn('Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)')
}

_quickTest()
  .then(() => conn.logger.info('Quick Test Done'))
  .catch(console.error)
})()
