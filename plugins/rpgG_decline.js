let handler = async (m, { conn }) => {
    let userId = m.sender;
    let guild = Object.values(global.db.data.guilds || {}).find(guild => guild.waitingRoom?.includes(userId));

    if (!guild) return conn.reply(m.chat, 'Tidak ada undangan guild yang tertunda untuk ditolak.', m);

    guild.waitingRoom = guild.waitingRoom.filter(room => room !== userId);
    await global.db.write();

    conn.reply(m.chat, 'Undangan guild telah ditolak.', m);
};

handler.help = ['guilddecline'];
handler.tags = ['rpgG'];
handler.command = /^(guilddecline)$/i;
handler.rpg = true;
export default handler;