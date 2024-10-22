let handler = async (m, { conn }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    let membersList = guild.members.map((member, idx) => `• ${idx + 1}. @${member.split('@')[0]}`).join('\n');
    let guildInfo = `
Nama Guild: ${guild.name}
Level: ${guild.level}
Pemilik: @${guild.owner.split('@')[0]}
Anggota:
${membersList}
Eksperience Guild: ${guild.exp} / 1000
Eliksir: ${guild.eliksir}
Harta: ${guild.harta}
Guardian: ${guild.guardian || '-'}
Attack: ${guild.attack}
Staff: ${guild.staff.length > 0 ? guild.staff.map(staff => `• @${staff.split('@')[0]}`).join('\n') : '-'}
Waiting Room: ${guild.waitingRoom.length > 0 ? guild.waitingRoom.map(room => `• @${room.split('@')[0]}`).join('\n') : '-' }
Dibuat Pada: ${guild.createdAt}`;

    conn.reply(m.chat, guildInfo, m, { mentions: [guild.owner, ...guild.members] });
};

handler.help = ['myguild'];
handler.tags = ['rpgG'];
handler.command = /^(myguild)$/i;
module.exports = handler;
