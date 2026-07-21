let handler = async (m, { conn, text, usedPrefix, command }) => {
    db.data.sticker = db.data.sticker || {}

    if (!m.quoted) throw `Balas stiker dengan perintah *${usedPrefix + command} <teks>*`
    if (!m.quoted.fileSha256) throw 'SHA256 Hash Missing'
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n*${usedPrefix + command} ${usedPrefix}afk*`

    let sticker = db.data.sticker
    let hash = Buffer.from(m.quoted.fileSha256).toString('hex')

    // Already registered, skip
    if (sticker[hash]) return m.reply('Stiker ini sudah memiliki perintah.')

    // Search existing commands by text
    let targetKey = null
    for (let [key, val] of Object.entries(sticker)) {
        if (val.text === text) {
            targetKey = key
            break
        }
    }
    if (!targetKey) throw `Tidak ada perintah *${text}* yang terdaftar. Buat dulu dengan *${usedPrefix}setcmd ${text}*`

    let original = sticker[targetKey]
    sticker[hash] = {
        text: original.text,
        mentionedJid: original.mentionedJid || [],
        creator: original.creator,
        at: +new Date(),
        locked: original.locked || false,
    }

    m.reply(`✅ Stiker ini sekarang terhubung ke perintah *${text}* (sumber: @${original.creator.split('@')[0]})`)
}

handler.help = ['linkcmd <teks>']
handler.tags = ['database']
handler.command = ['linkcmd']
handler.fail = null

module.exports = handler
