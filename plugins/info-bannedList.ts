let handler: WaPlugin = async (m, { conn, isOwner }) => {
    let chats = Object.entries(global.db.data.chats).filter(chat => chat[1].isBanned)
    let users = Object.entries(global.db.data.users).filter(user => user[1].banned)
    
    let _chatlist = chats.map(([jid], i) => {
        let formattedJid = jid.endsWith('@s.whatsapp.net') 
            ? jid.split('@')[0] 
            : jid.endsWith('@g.us') 
            ? jid 
            : jid
        
        return `├ ${i + 1}. ${formattedJid}`.trim()
    })

    let _userlist = users.map(([jid], i) => {
        let formattedJid = jid.endsWith('@s.whatsapp.net') 
            ? jid.split('@')[0] 
            : jid.endsWith('@g.us') 
            ? jid 
            : jid
        
        return `├ ${i + 1}. ${formattedJid}`.trim()
    })

    let caption = `
┌〔 Daftar Chat Terbanned 〕
├ Total : ${chats.length} Chat
${_chatlist.join('\n')}
└────

┌〔 Daftar Pengguna Terbanned 〕
├ Total : ${users.length} Pengguna
${_userlist.join('\n')}
└────
`.trim()
    
    conn.reply(m.chat, caption, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}

handler.help = ['bannedlist']
handler.tags = ['info']
handler.command = /^listban(ned)?|ban(ned)?list|daftarban(ned)?$/i
handler.owner = false
export default handler
