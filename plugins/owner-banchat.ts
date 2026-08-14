let handler: WaPlugin = async (m, { conn, participants }) => {
    global.db.data.chats[m.chat].isBanned = true
    m.reply('Berhasil membanned chat, Bot tidak akan respon di chat ini.')
}
handler.help = ['mute']
handler.tags = ['owner']
handler.command = ['mute']
handler.owner = true

export default handler
