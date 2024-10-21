let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guilds = Object.values(global.db.data.guilds);

    if (guilds.length === 0) {
        return conn.reply(m.chat, 'Belum ada guild yang terdaftar.', m);
    }

    let guildList = guilds.map((guild, idx) => `${idx + 1}. ${guild.name} (${guild.members.length} anggota)`).join('\n');

    conn.reply(m.chat, `Daftar Guild:\n${guildList}`, m);
};

handler.help = ['guildlistacc'];
handler.tags = ['rpgG'];
handler.command = /^(guildlistacc)$/i;
module.exports = handler;