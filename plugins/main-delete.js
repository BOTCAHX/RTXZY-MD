let handler = async (m, { conn, command }) => {
    if (!m.quoted) throw 'Reply pesan yang ingin dihapus';
    try {
        let res = m.message.extendedTextMessage.contextInfo;
        let deleteMsg = { delete: { remoteJid: m.chat, fromMe: false } };
        if (res.participant) {
            deleteMsg.delete.id = res.stanzaId;
            deleteMsg.delete.participant = res.participant;
        } else {
            deleteMsg.delete.id = res.stanzaId;
        }
        return conn.sendMessage(m.chat, deleteMsg);
    } catch {
        return conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
    }
};
handler.help = ['del', 'delete'];
handler.tags = ['tools'];
handler.botaadmin = true;
handler.command = ['del', 'delete', 'unsend'];

module.exports = handler;
