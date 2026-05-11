module.exports = Object.assign(async function handler(m, { conn, text }) {
    let hash = text
    if (m.quoted && m.quoted.fileSha256) {
        hash = m.quoted.fileSha256.toString('hex')
    }
    if (!hash) throw 'Hash not found'

    let sticker = global.db.data.sticker[hash]
    if (!sticker) return m.reply('Sticker Not in the database')

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
