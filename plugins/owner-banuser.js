let handler = async (m, { conn, text }) => {
    if (!text) throw 'Masukkan user yang ingin di ban\n\nExample: .ban 6282361160044'
    let who
    if (m.isGroup) who = m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    let users = global.db.data.users
    users[who].banned = true
    conn.reply(m.chat, `Berhasil Banned User`, m)
}
handler.help = ['ban']
handler.tags = ['owner']
handler.command = /^ban$/i
handler.mods = true

module.exports = handler
