let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (guild.owner !== userId) return conn.reply(m.chat, 'Hanya pemilik guild yang bisa mempromosikan anggota.', m);

    let target = m.mentionedJid[0] || args[0];

    if (!target) return conn.reply(m.chat, 'Tag user yang ingin kamu promosikan.', m);

    if (guild.staff.includes(target)) return conn.reply(m.chat, 'User sudah menjadi staff.', m);

    guild.staff.push(target);

    conn.reply(m.chat, `@${target.split('@')[0]} telah dipromosikan menjadi staff di guild ${guild.name}.`, m, { mentions: [target] });
};

handler.help = ['guildpromote <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildpromote)$/i;
module.exports = handler;