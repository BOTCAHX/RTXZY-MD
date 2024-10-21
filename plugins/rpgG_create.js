const fs = require('fs');
const dbPath = './database.json'; // Path ke database file

let handler = async (m, { conn, args }) => {
    if (args.length < 1) return conn.reply(m.chat, 'Contoh penggunaan: .createguild <nama_guild>', m);
    
    let userId = m.sender;
    let guildName = args.join(' ');

    // Memeriksa apakah user memiliki cukup money untuk membuat guild
    let user = global.db.data.users[userId];
    if (!user) return conn.reply(m.chat, 'Kamu belum terdaftar di dalam database.', m);
    
    if (user.money < 20000000000) {
        return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk membuat guild. Butuh 20.000.000.000 money.', m);
    }

    // Inisialisasi basis data pengguna jika belum ada
    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            guild: null,
            money: 0,
            exp: 0,
            // Menambahkan field untuk exp guild
            guild_exp: 0,
            // Inisialisasi data pengguna lainnya jika diperlukan
        };
    }
    
    if (user.guild) return conn.reply(m.chat, 'Kamu sudah tergabung dalam guild.', m);
    
    let guildId = 'guild_' + new Date().getTime(); // Membuat ID guild unik
    if (!global.db.data.guilds) global.db.data.guilds = {};
    if (!global.db.data.guilds[guildId]) {
        global.db.data.guilds[guildId] = {
            name: guildName,
            owner: userId,
            members: [userId],
            createdAt: new Date().toISOString(),
            level: 1, // Menambahkan level guild
            exp: 0, // Menambahkan exp guild
            eliksir: 0, // Menambahkan eliksir guild
            harta: 0, // Menambahkan harta guild
            guardian: null, // Menambahkan guardian guild
            attack: 0, // Menambahkan attack guild
            staff: [], // Menambahkan staff guild
            waitingRoom: [], // Menambahkan waiting room guild
        };
        user.guild = guildId;
        user.money -= 20000000000; // Mengurangi money user setelah membuat guild
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
        conn.reply(m.chat, `Guild ${guildName} berhasil dibuat.`, m);
    } else {
        conn.reply(m.chat, 'Terjadi kesalahan saat membuat guild. Coba lagi.', m);
    }
};

handler.help = ['createguild <nama_guild>'];
handler.tags = ['rpgG'];
handler.command = /^(createguild)$/i;
handler.owner = false;

module.exports = handler;