let handler = async (m, { conn, args }) => {
    let user = global.db.data.users[m.sender];
    let guildIndex = parseInt(args[0]) - 1; // Ambil nomor guild dari argumen

    if (!args[0] || isNaN(guildIndex)) return conn.reply(m.chat, 'Masukkan nomor guild yang valid.', m);
    if (user.guild) return conn.reply(m.chat, 'Anda sudah bergabung dalam guild.', m);

    let guildKeys = Object.keys(global.db.data.guilds);
    if (guildIndex < 0 || guildIndex >= guildKeys.length) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    let guildName = guildKeys[guildIndex];
    let guild = global.db.data.guilds[guildName];

    guild.members.push(m.sender);
    user.guild = guildName;

    conn.reply(m.chat, `Anda berhasil bergabung dengan guild ${guild.name}.`, m);
};

handler.help = ['joinguild <nomor_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(joinguild)$/i;
module.exports = handler;