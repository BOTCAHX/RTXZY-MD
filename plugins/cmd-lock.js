module.exports = Object.assign(async function handler(m, { conn, isOwner, isPremium, command }) {
    if (!(isOwner || isPremium)) {
        global.dfail('premium', m, conn)
        throw false
    }
    if (!m.quoted) throw 'Reply Pesan!'
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    let sticker = global.db.data.sticker
    let hash = Buffer.from(m.quoted.fileSha256).toString('hex')
    if (!(hash in sticker)) throw 'Hash not found in database'
    if (sticker[hash].creator !== m.sender && !isOwner)
        throw 'Kamu tidak memiliki izin untuk mengunci/membuka perintah stiker ini'
    sticker[hash].locked = !/^un/i.test(command)
    m.reply('Done!')
}, {
    help: ['un', ''].map(v => v + 'lockcmd'),
    tags: ['database'],
    command: /^(un)?lockcmd$/i
})
