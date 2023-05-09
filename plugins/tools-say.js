let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Harap masukkan text!\n\ncontoh:\n${usedPrefix + command} Haruno`
    conn.reply(m.chat, text, null)
}
handler.help = ['say <teks>']
handler.tags = ['tools']
handler.command = /^(say)$/i

module.exports = handler