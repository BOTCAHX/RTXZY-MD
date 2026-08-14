let handler: WaPlugin = async (m, { conn, command }) => {
    if (!m.quoted) throw 'Reply pesan yang ingin dihapus';
    try {
        let res = m.message.extendedTextMessage.contextInfo;
        let deleteMsg = { delete: { remoteJid: m.chat, fromMe: false } as { remoteJid?: string; fromMe?: boolean; id?: string; participant?: string } };
        if (res.participant) {
            deleteMsg.delete.id = String(res.stanzaId);
            deleteMsg.delete.participant = String(res.participant);
        } else {
            deleteMsg.delete.id = String(res.stanzaId);
        }
        return conn.sendMessage(m.chat, deleteMsg);
    } catch {
        return conn.sendMessage(m.chat, { delete: m.quoted.vM.key });
    }
};
handler.help = ['del', 'delete'];
handler.tags = ['tools'];
handler.admin = true;
handler.botAdmin = true;
handler.command = ['del', 'delete', 'unsend'];

export default handler;
