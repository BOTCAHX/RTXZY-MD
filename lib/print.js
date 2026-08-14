const __filename = import.meta.filename;
import * as zapo from './simple.js'; // adapter zapo-js (connection.js dihapus)

const loadZapo = async () => zapo;
let WAMessageStubType = null

import urlRegexSafe from 'url-regex-safe';
const urlRegex = urlRegexSafe({ strict: false });
import PhoneNumber from 'awesome-phonenumber';
let terminalImage = null;
import chalk from 'chalk';
import fs from 'fs';

const pnJid = (jid) => {
  // Hanya PN jid (@s.whatsapp.net) yang boleh diformat PhoneNumber.
  // @lid TIDAK PERNAH diformat — digit LID (berapapun panjangnya) bukan nomor telepon
  // (mis. 224739230494840@lid akan jadi '+224 739230494840' palsu).
  if (typeof jid !== 'string' || !jid) return null
  if (!jid.endsWith('@s.whatsapp.net')) return null
  const digits = jid.replace(/:\d+@/g, '@').split('@')[0]
  if (digits === '0') return null // nomor hidden/verified (0@s.whatsapp.net) → jangan '+0'
  return digits
}

export default async function (m, conn = { user: {} }) {
  if (!WAMessageStubType) {
  
    
    WAMessageStubType = zapo.WAMessageStubType || zapo.default?.WAMessageStubType || zapo.proto?.MessageStubType || {}
  }

  let _sender_jid = await (conn.getJidAsync ? conn.getJidAsync(m.sender, m.isGroup ? m.chat : '') : Promise.resolve(m.sender))
  let _name = _sender_jid ? await conn.getName(_sender_jid) : ''
  let sender_num = _sender_jid ? PhoneNumber('+' + pnJid(_sender_jid)).getNumber('international') : null
  let sender = _sender_jid ? (sender_num || pnJid(_sender_jid) || String(_sender_jid).split('@')[0]) + (_name ? ' ~' + _name : '') : 'System'
  let chat = m.chat ? await conn.getName(conn.getJid ? conn.getJid(m.chat) : m.chat).catch(() => '') : ''
  let img
  try {
    if (global.opts['img']) {
      if (!terminalImage) {
        terminalImage = await import('terminal-image');
        terminalImage = terminalImage.default || terminalImage;
      }
      img = /image/gi.test(m.mtype) ? await terminalImage.buffer(await m.download()) : false;
    }
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
  const meJid = conn.user?.jid ? await (conn.getJidAsync ? conn.getJidAsync(conn.user.jid) : Promise.resolve(conn.getJid ? conn.getJid(conn.user.jid) : conn.user.jid)) : ''
  let me = meJid ? (PhoneNumber('+' + pnJid(meJid)).getNumber('international') || pnJid(meJid) || String(meJid).split('@')[0]) : 'Unknown'

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
    if (m.mentionedJid) for (let user of m.mentionedJid) {
      let userJid = await (conn.getJidAsync ? conn.getJidAsync(user, m.isGroup ? m.chat : '') : Promise.resolve(user))
      log = log.replace('@' + userJid.split`@`[0], chalk.blueBright('@' + await conn.getName(userJid)))
    }
    console.log(m.error != null ? chalk.red(log) : m.isCommand ? chalk.yellow(log) : log)
  }

  if (m.messageStubParameters) {
    let paramsLog = await Promise.all(m.messageStubParameters.map(async jid => {
      if (typeof jid === 'string' && jid.startsWith('{')) {
        try { jid = JSON.parse(jid) } catch {}
      }
      if (typeof jid === 'object') {
        jid = jid.phoneNumber || jid.id || jid.jid || jid;
      }
      if (typeof jid !== 'string') return '';
      jid = conn.decodeJid(jid)
      jid = await (conn.getJidAsync ? conn.getJidAsync(jid, m.isGroup ? m.chat : '') : Promise.resolve(jid))
      let name = await conn.getName(jid).catch(() => '')
      let phone = (pnJid(jid) && PhoneNumber('+' + pnJid(jid)).getNumber('international')) || String(jid).split('@')[0] || jid;
      return chalk.gray(phone + (name ? ' ~' + name : ''))
    }))
    let out = paramsLog.filter(Boolean).join(', ')
    if (out) console.log(out)
  }

  if (/document/i.test(m.mtype)) console.log(`📄 ${m.msg.filename || m.msg.displayName || 'Document'}`)
  else if (/ContactsArray/i.test(m.mtype)) console.log(`👨‍👩‍👧‍👦 ${' ' || ''}`)
  else if (/contact/i.test(m.mtype)) console.log(`👨 ${m.msg.displayName || ''}`)
  else if (/audio/i.test(m.mtype)) {
    let s = m.msg.seconds || 0
    console.log(`${m.msg.ptt ? '🎤 (PTT ' : '🎵 ('}AUDIO) ${Math.floor(s / 60).toString().padStart(2, 0)}:${(s % 60).toString().padStart(2, 0)}`)
  }

  console.log()
}

import { pathToFileURL } from 'url';
let file = import.meta.filename;
// unwatch dulu: reload meng-import ulang module ini -> top-level jalan lagi,
// tanpa ini listener StatWatcher menumpuk (leak)
fs.unwatchFile(file);
fs.watchFile(file, async () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'lib/print.js'"));
  await import(pathToFileURL(file).href + '?update=' + Date.now());
});
