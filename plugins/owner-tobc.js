const { randomBytes } = require('crypto')

let handler = async (m, { conn, text }) => {
  let chats = Object.entries(conn.chats).filter(([_, chat]) => chat.isChats).map(v => v[0])
  let cc = conn.serializeM(text ? m : m.quoted ? await m.getQuotedObj() : false || m)
  let teks = text ? text : cc.text
  conn.reply(m.chat, `✅ Transmisi dibuat *Total:* ${chats.length} chats`, m)
  for (let id of chats) await conn.copyNForward(id, conn.cMod(m.chat, cc, /bc|broadcast|tx/i.test(teks) ? teks : `*BROADCAST┃ OWNER*\n_____________________\n ${teks} ` ), true).catch(_ => _)
  m.reply('✅ Sukses broadcast ke semua chat :)')
}
handler.help = ['tobc >reply media<']
handler.tags = ['owner']
handler.command = /^(tobc|tx)$/i
handler.owner = true

module.exports = handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const randomID = length => randomBytes(Math.ceil(length * .5)).toString('hex').slice(0, length)