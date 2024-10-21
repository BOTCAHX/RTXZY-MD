let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (guild.owner !== userId) return conn.reply(m.chat, 'Hanya pemilik guild yang bisa menghentikan perang.', m);

    // Logika untuk menghentikan perang dapat ditambahkan di sini

    conn.reply(m.chat, 'Pertempuran dengan guild lawan sedang dihentikan.', m);
};

handler.help = ['guildwarpause'];
handler.tags = ['rpgG'];
handler.command = /^(guildwarpause)$/i;
module.exports = handler;