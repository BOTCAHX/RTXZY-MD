let fs = require('fs')
let handler = async (m, { conn, isOwner }) => {
  let prem = global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)
  conn.reply(m.chat, `┌〔 Daftar Owner 〕` + `\n` + owner.map(v => isOwner ? '├ @' + v.replace(/@.+/, '') : '│ ' + conn.getName(v)).join`\n` + '\n└────', m, { contextInfo: { mentionedJid: prem } })
}
handler.help = ['group']
handler.tags = ['owner']
handler.command = /^(listowner|ownerlist)$/i

handler.owner = true
handler.group = true

module.exports = handler
