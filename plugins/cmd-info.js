module.exports = Object.assign(async function handler(m, { conn, text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) {
        hash = Buffer.from(m.quoted.fileSha256).toString('hex')
    }
    if (!hash) throw 'Hash not found'

    let sticker = global.db.data.sticker[hash]
    if (!sticker) return m.reply(
`*fileSha256:* ${hash}

Stiker ini tidak terdaftar di database cmd.
Hash di atas tidak cocok dengan hash stiker yang sudah di-setcmd.

Kemungkinan: stiker yang disave dan dikirim ulang memiliki hash file yang berbeda.
Coba minta teman untuk *forward* sticker (bukan save & kirim ulang).
Atau teman bisa setcmd sendiri di stiker versi mereka.`
    )

    let creatorJid = sticker.creator || ''
    let finalJid = creatorJid
    try {
        finalJid = await conn.getJid(creatorJid)
    } catch (e) {}

    let creatorName = await conn.getName(finalJid) || await conn.getName(creatorJid) || 'Unknown'
    let creatorNumber = finalJid.split('@')[0]

    let mentionedInfo = ''
    if (sticker.mentionedJid && sticker.mentionedJid.length > 0) {
        let mentions = []
        for (let jid of sticker.mentionedJid) {
            let resolvedJid = jid
            try {
                resolvedJid = await conn.getJid(jid)
            } catch (e) {}
            
            let name = await conn.getName(resolvedJid) || await conn.getName(jid) || 'Unknown'
            let number = resolvedJid.split('@')[0]
            mentions.push(`No. *${mentions.length + 1}*
*Mention Name:* ${name}
*Mention Number:* ${number}
*Mention Jid:* ${resolvedJid}`)
        }
        mentionedInfo = `*Cmd Mention:*\n\n${mentions.join('\n\n')}`
    }

    let txt = `
*fileSha256:* ${hash}
*Pack ID:* ${sticker.packId || '-'}
*Text:* ${sticker.text || '-'}
*Time Create:* ${sticker.at || '-'}
*Locked:* ${sticker.locked ? 'Yes' : 'No'}

*Creator Name:* ${creatorName}
*Creator Number:* ${creatorNumber}
*Creator Jid:* ${finalJid}
${mentionedInfo}
`.trim()

    await m.reply(txt)

}, {
    help: ['infocmd'].map(v => 'info' + v),
    tags: ['database'],
    command: ['infocmd']
})
