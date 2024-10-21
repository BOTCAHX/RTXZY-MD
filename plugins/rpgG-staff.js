const fs = require('fs');
const path = require('path');
let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    
    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (guild.owner !== userId) return conn.reply(m.chat, 'Hanya pemilik guild yang bisa mengatur staff.', m);

    if (!args[0]) return conn.reply(m.chat, 'Format yang kamu masukkan salah. Contoh penggunaan: .guildstaff tambah/hapus @user', m);

    let action = args[0].toLowerCase();
    let target = m.mentionedJid[0] || args[1];

    if (!target) return conn.reply(m.chat, 'Tag user yang ingin ditambahkan atau dihapus dari staff.', m);

    if (action === 'tambah') {
        if (guild.staff.includes(target)) return conn.reply(m.chat, 'User sudah menjadi staff.', m);

        guild.staff.push(target);
        conn.reply(m.chat, `@${target.split('@')[0]} telah ditambahkan sebagai staff di guild ${guild.name}.`, m, { mentions: [target] });
    } else if (action === 'hapus') {
        if (!guild.staff.includes(target)) return conn.reply(m.chat, 'User tidak ada di dalam staff.', m);

        guild.staff = guild.staff.filter(staff => staff !== target);
        conn.reply(m.chat, `@${target.split('@')[0]} telah dihapus dari staff di guild ${guild.name}.`, m, { mentions: [target] });
    } else {
        conn.reply(m.chat, 'Format yang kamu masukkan salah. Contoh penggunaan: .guildstaff tambah/hapus @user', m);
    }

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildstaff <tambah/hapus> <@user>'];
handler.tags = ['rpgG'];
handler.command = /^(guildstaff)$/i;
module.exports = handler;