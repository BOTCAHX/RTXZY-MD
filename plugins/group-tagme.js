let handler = async (m, { conn, text }) => {

let orang = (await conn.groupMetadata(m.chat)).participants.map(u => u.jid)
let tag = `@${m.sender.replace(/@.+/, '')}`
let mentionedJid = [m.sender]

  conn.reply(m.chat, tag, m, { contextInfo: { mentionedJid }})
}
handler.help = ['tagme']
handler.tags = ['group']
handler.command = /^tagme$/i

handler.group = true

module.exports = handler
