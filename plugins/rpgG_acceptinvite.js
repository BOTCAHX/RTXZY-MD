let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let target = m.mentionedJid[0] || args[0];

    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (!args[0]) return conn.reply(m.chat, 'Tag user yang ingin kamu terima undangannya ke guild.', m);

    if (guild.owner !== userId) return conn.reply(m.chat, 'Hanya pemilik guild yang bisa menerima undangan.', m);

    if (!guild.waitingRoom.includes(target)) return conn.reply(m.chat, 'User tidak ada di dalam daftar undangan.', m);

    guild.members.push(target);
    guild.waitingRoom = guild.waitingRoom.filter(room => room !== target);

    conn.reply(m.chat, `@${target.split('@')[0]} telah resmi bergabung dengan guild ${guild.name}.`, m, { mentions: [target] });
};

handler.help = ['guildinviteacc <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildinviteacc)$/i;
module.exports = handler;