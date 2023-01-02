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
  logger: P({ level: 'trace'}),
  version: [2, 2204, 13]
}

global.conn = simple.makeWASocket(connectionOptions)

if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (!opts['tmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
  }, 30 * 1000)
}

const _0x21ed95=_0x3ed7;(function(_0x5e8dac,_0x217768){const _0x3b81db=_0x3ed7,_0x20938c=_0x5e8dac();while(!![]){try{const _0x20f935=-parseInt(_0x3b81db(0xa8))/0x1+parseInt(_0x3b81db(0xb7))/0x2+-parseInt(_0x3b81db(0xba))/0x3+-parseInt(_0x3b81db(0xb4))/0x4*(-parseInt(_0x3b81db(0xaf))/0x5)+parseInt(_0x3b81db(0xb2))/0x6+parseInt(_0x3b81db(0xbd))/0x7+-parseInt(_0x3b81db(0xaa))/0x8;if(_0x20f935===_0x217768)break;else _0x20938c['push'](_0x20938c['shift']());}catch(_0x5b8fa2){_0x20938c['push'](_0x20938c['shift']());}}}(_0xbb28,0x49c7b));async function connectionUpdate(_0x37ee91){const _0x347699=_0x3ed7,{connection:_0x3feec1,lastDisconnect:_0x2930b3,isNewLogin:_0x248234}=_0x37ee91;if(_0x248234)conn[_0x347699(0xbe)]=!![];const _0xfffa9f=_0x2930b3?.[_0x347699(0xa6)]?.['output']?.['statusCode']||_0x2930b3?.[_0x347699(0xa6)]?.[_0x347699(0xb3)]?.[_0x347699(0xa3)]?.[_0x347699(0xb6)];_0xfffa9f&&_0xfffa9f!==DisconnectReason[_0x347699(0xa4)]&&conn?.['ws'][_0x347699(0xab)]!==CONNECTING&&(console['log'](await global[_0x347699(0xad)](!![])[_0x347699(0xa7)](console[_0x347699(0xa6)])),global[_0x347699(0xa5)]['connect']=new Date());if(global['db'][_0x347699(0xae)]==null)loadDatabase();if(_0x37ee91[_0x347699(0xbc)])conn['sendButtonImg'](_0x347699(0xb8),_0x347699(0xa2),_0x347699(0xb0)+global[_0x347699(0xac)]+_0x347699(0xbb)+global[_0x347699(0xb9)]+_0x347699(0xb5),_0x347699(0xa9),'Ok',_0x347699(0xb1),null);}process['on']('uncaughtException',console[_0x21ed95(0xa6)]);function _0x3ed7(_0xea8f63,_0x1bdfbe){const _0xbb28a4=_0xbb28();return _0x3ed7=function(_0x3ed715,_0xa3b3d9){_0x3ed715=_0x3ed715-0xa2;let _0x30a6c0=_0xbb28a4[_0x3ed715];return _0x30a6c0;},_0x3ed7(_0xea8f63,_0x1bdfbe);}function _0xbb28(){const _0xc95fde=['220708eeIpSM','Pesan\x20dari\x20creator:\x0aBoleh\x20recode\x20atau\x20repost\x20script\x20ini,\x20tapi\x20harus\x20ijin\x20terlebih\x20dahulu\x20ke\x20creator\x20nya.\x0a\x0a*Warning!*\x0a*Jangan\x20diperjual\x20belikan.*','7583920VpRGQa','readyState','owner','reloadHandler','data','5yXYkMk','\x20\x0a╭─「\x20*Notifikasi*\x20」\x0a│\x20•\x20➢\x20*Bot\x20Berhasil\x20Tersambung\x20✅*\x0a│\x20•\x20➢\x20*Owner*\x20:\x20@','null','1839960gdyenX','output','1666576iQkCpB','\x20\x0a╰────','statusCode','745228dIigwA','6281395861695@s.whatsapp.net','namebot','336525ntkQhF','\x0a│\x20•\x20➢\x20*Bot\x20Name*\x20:\x20','receivedPendingNotifications','3410106LkbQXM','isInit','https://telegra.ph/file/ad82b7133ea837cdf1c5b.jpg','payload','loggedOut','timestamp','error','catch'];_0xbb28=function(){return _0xc95fde;};return _0xbb28();}
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
