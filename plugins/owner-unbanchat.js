let handler = async (m, { conn, isOwner, text }) => {
	if (!text) throw 'Masukkan user/id group yang ingin di unban\n\nExample: .unban 6282361160044 atau .ban 73647438@g.us'
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
    if (text.endsWith('g.us')) global.db.data.chats[text].isBanned = false
    else global.db.data.users[who].banned = false
    m.reply(`Berhasil unban! ${await conn.user.name} aktif dichat ${await conn.getName(who) == undefined ? 'ini' : await conn.getName(who)}.`)
  } catch (e) {
    throw `nomor tidak ada didatabase!`
  }
}
handler.help = ['unban']
handler.tags = ['owner']
handler.command = /^unban(chat)?$/i

handler.owner = true
module.exports = handler
