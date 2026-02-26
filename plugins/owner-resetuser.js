let handler = async (m, { conn, text }) => {
    function no(number) {
        return number.replace(/\s/g, '').replace(/([@+-])/g, '')
    }

    if (!text && !m.quoted && !m.mentionedJid?.[0]) {
        return conn.reply(m.chat, `*❏ DELETE USER*\n\nTag user, tulis nomor, atau balas member yang ingin di RESET`, m)
    }

    let userJid

    if (m.mentionedJid?.[0]) {
        userJid = m.mentionedJid[0]
    } else if (m.quoted?.sender) {
        userJid = m.quoted.sender
    } else {
        text = no(text)
        if (isNaN(text)) return conn.reply(m.chat, `*❏ DELETE USER*\n\nNomor yang kamu masukkan tidak valid !`, m)
        if (text.length < 10 || text.length > 15) return conn.reply(m.chat, `*❏ DELETE USER*\n\nNomor yang kamu masukkan tidak valid !`, m)
        userJid = text + '@s.whatsapp.net'
    }

    if (userJid.endsWith('@lid') && m.isGroup) {
        try {
            const groupMeta = await conn.groupMetadata(m.chat)
            const participant = groupMeta.participants.find(p => 
                p.id === userJid || 
                p.jid === userJid ||
                (p.id && p.id.includes(userJid.split('@')[0]))
            )
            if (participant) {
                userJid = participant.id || participant.jid
            } else {
                return conn.reply(m.chat, `*❏ DELETE USER*\n\nTidak dapat menemukan mapping nomor dari LID ini`, m)
            }
        } catch {
            return conn.reply(m.chat, `*❏ DELETE USER*\n\nGagal mendapatkan metadata grup`, m)
        }
    }

    if (!userJid.endsWith('@s.whatsapp.net')) {
        return conn.reply(m.chat, `*❏ DELETE USER*\n\nGagal mendapatkan JID yang valid`, m)
    }

    const number = userJid.split('@')[0]

    delete global.db.data.users[userJid]

    conn.reply(m.chat, `*❏ DELETE USER*\n\nBerhasil menghapus @${number} dari *DATABASE*`, null, {
        contextInfo: {
            mentionedJid: [userJid]
        }
    })
}

handler.help = ['reset']
handler.tags = ['owner']
handler.command = /^reset$/i
handler.owner = true
handler.group = false
handler.botAdmin = false

module.exports = handler
