let handler = m => m

handler.all = async function (m) {
    if (!m.isGroup) return
    let chat = global.db.data.chats[m.chat]
    if (!chat || !chat.antibot) return
    
    let isBotLain = (m.id.startsWith('3EB0') || m.id.startsWith('BAE5') || m.id.startsWith('B24E')) && (m.id.length === 22 || m.id.length === 16)
    if (isBotLain) {
        if (!global.antibot_kick) global.antibot_kick = {}
        let id = m.sender
        global.antibot_kick[m.chat + id] = (global.antibot_kick[m.chat + id] || 0) + 1

        let count = global.antibot_kick[m.chat + id]
        if (count < 3) {
            await this.reply(m.chat, `⚠️ Peringatan ${count}/3 untuk @${id.split('@')[0]} (terdeteksi bot)`, m, { mentions: [id] })
        } else {
            let groupMetadata = m.isGroup ? await this.groupMetadata(m.chat).catch(_ => null) : {}
            let participants = m.isGroup ? groupMetadata.participants : []
            let botId = this.user.jid || this.user.id
            botId = botId.split(':')[0].split('@')[0]
            let bot = m.isGroup ? participants.find(u => (u.jid || u.id || '').includes(botId)) : {}
            let isBotAdmin = bot?.admin === 'admin' || bot?.admin === 'superadmin' || false
            
            if (isBotAdmin) {
                await this.reply(m.chat, `🚫 @${id.split('@')[0]} telah mencapai 3 peringatan, akan dikick otomatis!`, m, { mentions: [id] })
                await this.groupParticipantsUpdate(m.chat, [id], 'remove').catch(() => {})
                global.antibot_kick[m.chat + id] = 0 // reset setelah kick
            } else {
                await this.reply(m.chat, `⚠️ @${id.split('@')[0]} mencapai 3 peringatan spam bot, tapi saya tidak bisa mengeluarkannya karena saya bukan Admin!`, m, { mentions: [id] })
                global.antibot_kick[m.chat + id] = 0 // reset agar terus memperingatkan ulang
            }
        }
    }
}

export default handler
