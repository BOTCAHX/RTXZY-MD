let handler = async (m, { conn, args }) => {
    if (!args || !args[0]) throw 'Siapa yang mau di Unwarn om?'
    let mention = m.mentionedJid[0] || conn.parseMention(args[0]) || (args[0].replace(/[@.+-]/g, '').replace(' ', '') + '@s.whatsapp.net') || ''
    if (!mention) throw 'Tag salah satu lah'
    if (!(mention in global.db.data.users)) throw 'User tidak terdaftar dalam DATABASE!!'
    let user = global.db.data.users[mention]
    if (user.Banneduser) throw 'User telah terbanned!!'
    if ((user.warn * 1) < 1) throw 'User tidak mempunyai warn'
    let count = (args[1] || args.length > 0 ? !isNaN(parseInt(args[1])) ? parseInt(args[1]) : 1 : 1) || 1
    if ((user.warn * 1) < count * 1) throw `User hanya memiliki *${user.warn * 1}* WARN!!`
    user.warn -= count * 1
    m.reply('Berhasil Unwarn user!!')
    m.reply('Kamu telah di Unwarn OWNER Atau MODERATOR, sekarang kamu memiliki *' + (global.DATABASE._data.users[mention].warn * 1) + '* WARN', mention)
}

handler.help = ['unwarn @mention']
handler.tags = ['owner']
handler.command = /^unwarn(user)?$/i
handler.mods = true

module.exports = handler
