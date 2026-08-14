let handler = async (m, { conn, text, participants, usedPrefix, command }) => {
    if (!text) throw `_Masukan nomor!_\nContoh:\n\n${usedPrefix + command} ${global.owner[0]}`;
    
    m.reply('_Sedang di proses..._');
    const _participants = participants.map(user => user.id);
    
    const users = text.split(',')
        .map(v => v.replace(/[^0-9]/g, ''))
        .filter(v => v.length > 4 && v.length < 20 && !_participants.includes(v + '@s.whatsapp.net'))
        .map(v => v + '@s.whatsapp.net');

    for (const user of users) {
        try {
            const [exists] = await conn.onWhatsApp(user);
            if (!exists) continue;

            const response = await conn.groupParticipantsUpdate(m.chat, [user], "add");
            
            if (response[0].status === '403' || response[0].status === '408') {
                const groupMetadata = await conn.groupMetadata(m.chat);
                const groupCode = await conn.groupInviteCode(m.chat);
                const inviteMessage = `Hai! Anda diundang untuk bergabung ke grup ${groupMetadata.subject}. Silakan bergabung melalui link berikut: https://chat.whatsapp.com/${groupCode}`;
                
                await conn.sendMessage(user, { 
                    text: inviteMessage
                });
                
                await conn.reply(m.chat, `Mengirim undangan langsung ke @${user.split('@')[0]}`, m, {
                    mentions: [user]
                });
            }
        } catch (error) {
            console.error(`Error adding user ${user}:`, error);
            await conn.reply(m.chat, `Gagal menambahkan @${user.split('@')[0]}`, m, {
                mentions: [user]
            });
        }
    }
};

handler.help = ['add', '+'].map(v => v + ' @user');
handler.tags = ['group'];
handler.command = /^(add|\+)$/i;
handler.admin = true;
handler.group = true;
handler.botAdmin = true;
handler.fail = null;

export default handler;
