let handler = async (m, { conn, participants }) => {
  // if (participants.map(v=>v.jid).includes(global.conn.user.jid)) {
    global.db.data.chats[m.chat].isBanned = true
    m.reply('Berhasil membanned chat, Bot tidak akan respon di chat ini.')
  // } else m.reply('Ada nomor host disini...')
}
handler.help = ['mute']
handler.tags = ['owner']
handler.command = ['mute']
handler.owner = true

module.exports = handler
