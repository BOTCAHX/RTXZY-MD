let handler = async (m, { conn, isOwner, text }) => {
	if (!text) throw 'Masukkan user/id group yang ingin di ban\n\nExample: .ban 6282361160044 atau .ban 2837372829@g.us'
  let who
  if (m.isGroup) {
    if (isOwner) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
    else who = m.chat
  } else {
    if (!isOwner) {
      global.dfail('owner', m, conn)
      throw false
    }
    who = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.chat
  }

  try {
    if (text.endsWith('g.us')) global.db.data.chats[text].isBanned = true
    else global.db.data.users[who].banned = true
    m.reply(`Berhasil ban! ${await conn.user.name} nonaktif dichat ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}.`)
  } catch (e) {
    throw `nomor tidak ada didatabase!`
  }
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban(chat)?$/i

handler.owner = true
module.exports = handler
