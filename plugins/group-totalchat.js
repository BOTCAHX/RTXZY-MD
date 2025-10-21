let handler = async (m, { conn }) => {
    const data = global.db.data.totalchat || {};
    const chatData = data[m.chat] || {};

    const entries = Object.entries(chatData);
    if (entries.length === 0) {
        return m.reply('📭 Belum ada data chat untuk grup ini.');
    }
    const sorted = entries.sort((a, b) => b[1] - a[1]);
    const totalChat = sorted.reduce((sum, [, count]) => sum + count, 0);

    let text = '';
    const mentionList = [];

    sorted.forEach(([jid, count], index) => {
        const mention = '@' + jid.split('@')[0];
        text += `*${index + 1}.* ${mention}: *${count}* pesan\n`;
        mentionList.push(jid);
    });

    let groupName = '';
    try {
        groupName = await conn.getName(m.chat);
    } catch {
        groupName = m.chat;
    }

    await m.reply(
        `📊 *Statistik Total Chat*\n` +
        `📅 Grup: *${groupName}*\n` +
        `👥 Total Pesan: *${totalChat}*\n\n` +
        text,
        null,
        { mentions: mentionList }
    );
};

handler.help = ['totalchat', 'totalpesan'];
handler.tags = ['group'];
handler.command = /^(totalchat|totalpesan)$/i;
handler.group = true;

module.exports = handler;
