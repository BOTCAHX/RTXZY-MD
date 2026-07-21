/* tutorial https://youtu.be/O1CoP5bpssA?si=3H7Ly7jp2luTuHoQ*/

let handler = async (m, { conn }) => {
    if (!m.quoted) return conn.reply(m.chat, '[❗] Reply undangan admin channel!', m)
    
    try {
        let context = m.message?.extendedTextMessage?.contextInfo || {}
        let quotedMsg = context.quotedMessage
        
        if (!quotedMsg) return conn.reply(m.chat, '[❗] Pesan yang dibalas tidak terbaca sistem.', m)

        let idChannel = null
        if (quotedMsg.newsletterAdminInviteMessage?.newsletterJid) {
            idChannel = quotedMsg.newsletterAdminInviteMessage.newsletterJid
        } 
        else {
            let type = Object.keys(quotedMsg)[0] 
            let forwardedInfo = quotedMsg[type]?.contextInfo?.forwardedNewsletterMessageInfo
            
            if (forwardedInfo?.newsletterJid) {
                idChannel = forwardedInfo.newsletterJid
            }
        }

        if (!idChannel && m.quoted?.msg?.contextInfo?.forwardedNewsletterMessageInfo?.newsletterJid) {
            idChannel = m.quoted.msg.contextInfo.forwardedNewsletterMessageInfo.newsletterJid
        }
        if (!idChannel) {
            return conn.reply(m.chat, '[❗] Gagal! Pastikan reply adalah undangan admin Channel.', m)
        }
        
        await conn.reply(m.chat, `${idChannel}`, m)
        
    } catch (e) {
        console.error('Error IDCH:', e)
        conn.reply(m.chat, '[❗] Terjadi kesalahan saat memproses data pesan!', m)
    }
}

handler.help = handler.command = ['channelinfo', 'idch']
handler.tags = ['main']
module.exports = handler