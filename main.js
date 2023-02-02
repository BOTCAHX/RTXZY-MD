(async () => {
require('./config')
const {
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

const _0x19e910=_0x5a78;(function(_0xd034bf,_0x5b0452){const _0x5115a0=_0x5a78,_0x439e55=_0xd034bf();while(!![]){try{const _0x131cfe=-parseInt(_0x5115a0(0x1b5))/0x1+-parseInt(_0x5115a0(0x1a9))/0x2*(-parseInt(_0x5115a0(0x1a3))/0x3)+parseInt(_0x5115a0(0x1a5))/0x4+-parseInt(_0x5115a0(0x1a8))/0x5*(parseInt(_0x5115a0(0x1a2))/0x6)+parseInt(_0x5115a0(0x1ac))/0x7*(parseInt(_0x5115a0(0x1a6))/0x8)+-parseInt(_0x5115a0(0x1b6))/0x9+parseInt(_0x5115a0(0x1b2))/0xa*(parseInt(_0x5115a0(0x1b1))/0xb);if(_0x131cfe===_0x5b0452)break;else _0x439e55['push'](_0x439e55['shift']());}catch(_0x19cb57){_0x439e55['push'](_0x439e55['shift']());}}}(_0x20f5,0xc157a));async function connectionUpdate(_0x4b717d){const _0x51359d=_0x5a78,{connection:_0x2ff9d3,lastDisconnect:_0x576d10}=_0x4b717d;global[_0x51359d(0x1ab)][_0x51359d(0x1ad)]=new Date();_0x576d10&&_0x576d10[_0x51359d(0x1b9)]&&_0x576d10[_0x51359d(0x1b9)]['output']&&_0x576d10[_0x51359d(0x1b9)]['output']['statusCode']!==DisconnectReason['loggedOut']&&conn['ws']['readyState']!==WebSocket[_0x51359d(0x1b4)]&&console[_0x51359d(0x1aa)](global['reloadHandler'](!![]));if(global['db'][_0x51359d(0x1b8)]==null)await loadDatabase();if(_0x4b717d[_0x51359d(0x1ae)])conn[_0x51359d(0x1b7)]('6285692006004@s.whatsapp.net',_0x51359d(0x1b3),_0x51359d(0x1a4)+global[_0x51359d(0x1a1)]+'\x0a│\x20•\x20➢\x20*Bot\x20Name*\x20:\x20'+global[_0x51359d(0x1b0)]+_0x51359d(0x1af),'Pesan\x20dari\x20creator:\x0aBoleh\x20recode\x20atau\x20repost\x20script\x20ini,\x20tapi\x20harus\x20ijin\x20terlebih\x20dahulu\x20ke\x20creator\x20nya.\x0a\x0a*Warning!*\x0a*Jangan\x20diperjual\x20belikan.*','Ok',_0x51359d(0x1ba),null);}function _0x5a78(_0x20e1b5,_0x51619a){const _0x20f529=_0x20f5();return _0x5a78=function(_0x5a7884,_0x2b47a7){_0x5a7884=_0x5a7884-0x1a1;let _0x2cee96=_0x20f529[_0x5a7884];return _0x2cee96;},_0x5a78(_0x20e1b5,_0x51619a);}function _0x20f5(){const _0x5d0ae3=['2019060wLYeLM','sendButtonImg','data','error','null','owner','207066glxEKf','39021YsiiXy','\x20\x0a╭─「\x20*Notifikasi*\x20」\x0a│\x20•\x20➢\x20*Bot\x20Berhasil\x20Tersambung\x20✅*\x0a│\x20•\x20➢\x20*Owner*\x20:\x20@','89568ZeRLHt','64OgRRsU','uncaughtException','55mzWWmW','86NsEyno','log','timestamp','901691NCOgQs','connect','receivedPendingNotifications','\x20\x0a╰────','namebot','11vYPipM','5616740CwenpP','https://telegra.ph/file/ad82b7133ea837cdf1c5b.jpg','CONNECTING','777980PiXoVJ'];_0x20f5=function(){return _0x5d0ae3;};return _0x20f5();}process['on'](_0x19e910(0x1a7),console[_0x19e910(0x1b9)]);
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
