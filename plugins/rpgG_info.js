let handler = async (m, { conn, args }) => {
    let target = m.mentionedJid[0] || m.sender;

    let user = global.db.data.users[target];
    if (!user || !user.guild) return conn.reply(m.chat, 'Pengguna ini tidak tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    let membersList = guild.members.map((member, idx) => `• ${idx + 1}. @${member.split('@')[0]}`).join('\n');
    let guildInfo = `
亗 Nama Guild: ${guild.name}
亗 Level: ${guild.level}
亗 Pemilik: @${guild.owner.split('@')[0]}
亗 Anggota:
 - ${membersList}
亗 Eksperience Guild: ${guild.exp} / 1000
亗 Eliksir: ${guild.eliksir}
亗 Harta: ${guild.harta}
亗 Guardian: ${guild.guardian || '-'}
亗 Attack: ${guild.attack}
亗 Staff: ${guild.staff.length > 0 ? guild.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
亗 Waiting Room: ${guild.waitingRoom.length > 0 ? guild.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-' }
亗 Building Made: ${guild.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [guild.owner, ...guild.members] });
};

handler.help = ['guildinfo [@user]'];
handler.tags = ['rpgG'];
handler.command = /^(guildinfo)$/i;
module.exports = handler;