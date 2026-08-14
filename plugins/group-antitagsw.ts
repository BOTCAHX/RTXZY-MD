let handler: WaPlugin = async (m, { conn, args, isAdmin, isOwner }) => {
    if (!m.isGroup) return m.reply("Fitur ini hanya dapat digunakan dalam grup.")
    if (!(isAdmin || isOwner)) return m.reply("Maaf, fitur ini hanya dapat digunakan oleh admin grup.")
    
    global.db.data.chats = global.db.data.chats || {}
    
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {}
    }
    
    if (!args[0]) return m.reply("Silakan gunakan: .antitagsw *on/off*")
    
    if (args[0] === "on") {
        if (global.db.data.chats[m.chat].antitagsw) return m.reply("Fitur Anti Tag Status WhatsApp sudah aktif di grup ini.")
        global.db.data.chats[m.chat].antitagsw = true
        return m.reply("*Anti Tag Status WhatsApp* berhasil diaktifkan dalam grup ini.")
    } else if (args[0] === "off") {
        if (!global.db.data.chats[m.chat].antitagsw) return m.reply("Fitur Anti Tag Status WhatsApp sudah nonaktif di grup ini.")
        global.db.data.chats[m.chat].antitagsw = false
        return m.reply("*Anti Tag Status WhatsApp* berhasil dinonaktifkan dalam grup ini.")
    } else {
        return m.reply("Mohon pilih opsi yang valid: *on/off*")
    }
}

handler.before = async (m, { conn, isBotAdmin, isAdmin }) => {
    global.db.data.chats = global.db.data.chats || {}
    if (!global.db.data.chats[m.chat]) {
        global.db.data.chats[m.chat] = {}
    }
    
    if (!m.isGroup || !global.db.data.chats[m.chat].antitagsw) return
    
    const isTaggingInStatus = (
        m.mtype === 'groupStatusMentionMessage' || 
        (m.quoted && m.quoted.mtype === 'groupStatusMentionMessage') ||
        (m.message && m.message.groupStatusMentionMessage) ||
        (m.message && m.message.protocolMessage && m.message.protocolMessage.type === 25)
    )
    
    if (!isTaggingInStatus) return
    
    await conn.sendMessage(m.chat, { delete: m.key })
   
    if (isAdmin) { // admin: only delete the message, do not kick
        let warningMessage = `Grup ini terdeteksi ditandai dalam Status WhatsApp\n\n` +
                            `@${m.sender.split("@")[0]}, mohon untuk tidak menandai grup dalam status WhatsApp` +
                            `\n\nHal tersebut tidak diperbolehkan dalam grup ini.`
        
        return conn.sendMessage(m.chat, { text: warningMessage, mentions: [m.sender] })
    }
    
    if (isBotAdmin) {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
        await conn.sendMessage(m.chat, { text: `@${m.sender.split("@")[0]} telah dikeluarkan dari grup karena menandai grup dalam status WhatsApp.`, mentions: [m.sender] })
    } else {
        let warningMessage = `Grup ini terdeteksi ditandai dalam Status WhatsApp\n\n` +
                            `@${m.sender.split("@")[0]}, mohon untuk tidak menandai grup dalam status WhatsApp` +
                            `\n\nHal tersebut tidak diperbolehkan dalam grup ini.`
        
        return conn.sendMessage(m.chat, { text: warningMessage, mentions: [m.sender] })
    }
}

handler.command = ['antitagsw']
handler.help = ['antitagsw'].map(a => a + ' *on/off*');
handler.tags = ['group']
handler.group = true
handler.admin = true

export default handler
