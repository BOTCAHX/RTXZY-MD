let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    if (!user?.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds?.[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);
    if (guild.owner !== m.sender && !guild.staff?.includes(m.sender)) {
        return conn.reply(m.chat, 'Anda tidak memiliki izin untuk melakukan ini.', m);
    }

    let target = m.mentionedJid[0] || args[0];
    if (!target) return conn.reply(m.chat, 'Tag user yang ingin Anda terima di guild.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser) return conn.reply(m.chat, 'Pengguna tidak ditemukan di database.', m);
    if (targetUser.guild) return conn.reply(m.chat, 'Pengguna sudah tergabung dalam guild.', m);

    if (!guild.waitingRoom?.includes(target)) return conn.reply(m.chat, 'Tidak ada undangan tertunda dari pengguna ini.', m);

    if (!Array.isArray(guild.members)) guild.members = [];
    if (!guild.members.includes(target)) guild.members.push(target);
    targetUser.guild = guildId;
    guild.waitingRoom = guild.waitingRoom.filter(member => member !== target);

    await global.db.write();
    conn.reply(m.chat, `Undangan untuk @${target.split('@')[0]} telah diterima.`, m, { mentions: [target] });
};

handler.help = ['guildaccept @user'];
handler.tags = ['rpgG'];
handler.command = /^(guildaccept)$/i;
handler.rpg = true;
export default handler;