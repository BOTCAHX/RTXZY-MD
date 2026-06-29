let WAMessageStubType = null

let urlRegex = require('url-regex-safe')({ strict: false })
let PhoneNumber = require('awesome-phonenumber')
let terminalImage = global.opts['img'] ? require('terminal-image') : null
if (terminalImage) terminalImage = terminalImage.default || terminalImage
let chalk = require('chalk')
let fs = require('fs')

module.exports = async function (m, conn = { user: {} }) {
  if (!WAMessageStubType) {
  const { loadBaileys } = await import('../baileys-loader.mjs');
    const baileys = await loadBaileys();
    WAMessageStubType = baileys.WAMessageStubType || baileys.default?.WAMessageStubType || baileys.proto?.MessageStubType || {}
  }

  let _name = await conn.getName(m.sender)
  let sender = PhoneNumber('+' + m.sender.replace('@s.whatsapp.net', '')).getNumber('international') + (_name ? ' ~' + _name : '')
  let chat = await conn.getName(m.chat)
  let img
  try {
    if (global.opts['img'] && terminalImage)
      img = /image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false
  } catch (e) {
    console.error(e)
  }

  let filesize = (m.msg ?
    m.msg.vcard ? m.msg.vcard.length :
    m.msg.fileLength ? m.msg.fileLength.low || m.msg.fileLength :
    m.msg.axolotlSenderKeyDistributionMessage ? m.msg.axolotlSenderKeyDistributionMessage.length :
    m.text ? m.text.length : 0
  : m.text ? m.text.length : 0) || 0

  let user = global.DATABASE?.data?.users[m.sender]
  let me = PhoneNumber('+' + (conn.user?.jid || '').replace('@s.whatsapp.net', '')).getNumber('international')

  console.log(`▣────────────···
│ ${chalk.redBright('%s')}
│⏰ㅤ${chalk.black(chalk.bgYellow('%s'))}
│📑ㅤ${chalk.black(chalk.bgGreen('%s'))}
│📊ㅤ${chalk.magenta('%s [%s %sB]')}
│📤ㅤ${chalk.green('%s')}
│📃ㅤ${chalk.yellow('%s%s')}
│📥ㅤ${chalk.green('%s')}
│💬ㅤ${chalk.black(chalk.bgYellow('%s'))}
▣────────────···`.trim(),
    me + ' ~' + (conn.user?.name || ''),
    new Date(1000 * (m.messageTimestamp?.low || m.messageTimestamp || Date.now()/1000)).toTimeString(),
    m.messageStubType ? WAMessageStubType[m.messageStubType] : '',
    filesize,
    filesize === 0 ? 0 : (filesize / 1009 ** Math.floor(Math.log(filesize) / Math.log(1000))).toFixed(1),
    ['', ...'KMGTP'][Math.floor(Math.log(filesize) / Math.log(1000))] || '',
    sender,
    m.exp ?? '?',
    user ? '|' + user.exp + '|' + user.limit : '',
    m.chat + (chat ? ' ~' + chat : ''),
    m.mtype ? m.mtype.replace(/message$/i, '').replace('audio', m.msg?.ptt ? 'PTT' : 'audio').replace(/^./, v => v.toUpperCase()) : ''
  )

  if (img) console.log(img.trimEnd())

  if (typeof m.text === 'string' && m.text) {
    let log = m.text.replace(/\u200e+/g, '')
    let mdRegex = /(?<=(?:^|[\s\n])\S?)(?:([*_~])(.+?)\1|```((?:.||[\n\r])+?)```)(?=\S?(?:[\s\n]|$))/g
    let mdFormat = (depth = 4) => (_, type, text, monospace) => {
      let types = { _: 'italic', '*': 'bold', '~': 'strikethrough' }
      text = text || monospace
      return !types[type] || depth < 1 ? text : chalk[types[type]](text.replace(mdRegex, mdFormat(depth - 1)))
    }
    if (log.length < 4096)
      log = log.replace(urlRegex, (url, i, text) => {
        let end = url.length + i
        return i === 0 || end === text.length || (/^\s$/.test(text[end]) && /^\s$/.test(text[i - 1])) ? chalk.blueBright(url) : url
      })
    log = log.replace(mdRegex, mdFormat(4))
    if (m.mentionedJid) for (let user of m.mentionedJid) log = log.replace('@' + user.split`@`[0], chalk.blueBright('@' + await conn.getName(user)))
    console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }

  if (m.messageStubParameters) console.log(m.messageStubParameters.map(jid => {
    jid = conn.decodeJid(jid)
    let name = conn.getName(jid)
    return chalk.gray(PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international') + (name ? ' ~' + name : ''))
  }).join(', '))

  if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.filename || m.msg.displayName || 'Document'}`)
  else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
  else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
  else if (/audio/i.test(m.mtype)) {
    let s = m.msg.seconds || 0
    console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(s / 60).toString().padStart(2, 0)}:${(s % 60).toString().padStart(2, 0)}`)
  }

  console.log()
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'lib/print.js'"))
  delete require.cache[file]
  require(file)
})
