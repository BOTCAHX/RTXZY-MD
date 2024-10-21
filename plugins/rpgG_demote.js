let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (guild.owner !== userId) return conn.reply(m.chat, 'Hanya pemilik guild yang bisa menurunkan pangkat anggota.', m);

    let target = m.mentionedJid[0] || args[0];

    if (!target) return conn.reply(m.chat, 'Tag user yang ingin kamu turunkan pangkatnya.', m);

    if (!guild.staff.includes(target)) return conn.reply(m.chat, 'User tidak ada di dalam staff.', m);

    guild.staff = guild.staff.filter(staff => staff !== target);

    conn.reply(m.chat, `@${target.split('@')[0]} telah diturunkan pangkatnya di guild ${guild.name}.`, m, { mentions: [target] });
};

handler.help = ['guilddemote <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guilddemote)$/i;
module.exports = handler;