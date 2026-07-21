let handler = async (m, { conn, usedPrefix, text, command }) => {
    let sticker = global.db.data.sticker
    if (!sticker) throw 'Belum ada perintah stiker'

    let hash = text
    if (m.quoted && m.quoted.fileSha256) hash = Buffer.from(m.quoted.fileSha256).toString('hex')
    if (!hash) throw `Tidak ada hash`
    let packId = sticker[hash]?.packId
    if (sticker[hash] && sticker[hash].locked) throw 'Kamu tidak memiliki izin untuk menghapus perintah stiker ini'

    // Delete the specific hash
    delete sticker[hash]

    // Also delete ALL entries sharing the same packId to prevent auto-resurrection
    if (packId) {
        for (const key in sticker) {
            if (sticker[key]?.packId === packId) {
                delete sticker[key]
            }
        }
    }

    m.reply(`Berhasil!`)
}


handler.help = ['cmd'].map(v => 'del' + v + ' <teks>')
handler.tags = ['database', 'premium']
handler.command = ['delcmd']
handler.premium = true
module.exports = handler
