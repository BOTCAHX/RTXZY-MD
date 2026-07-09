let handler = async (m, { conn, usedPrefix, text, command }) => {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = Buffer.from(m.quoted.fileSha256).toString('hex')
    if (!hash) throw `Tidak ada hash`
    let sticker = global.db.data.sticker
    if (sticker[hash] && sticker[hash].locked) throw 'Kamu tidak memiliki izin untuk menghapus perintah stiker ini'
    delete sticker[hash]
    m.reply(`Berhasil!`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database', 'premium']
handler.command = ['delcmd']
handler.premium = true
module.exports = handler
