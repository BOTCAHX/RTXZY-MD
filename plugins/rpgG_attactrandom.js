const fs = require('fs');
const dbPath = './database.json';

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    let guildId = user.guild;

    if (!guildId) {
        return conn.reply(m.chat, 'Anda harus bergabung dengan sebuah guild untuk menggunakan perintah ini.', m);
    }

    let guild = global.db.data.guilds[guildId];
    if (!guild) {
        return conn.reply(m.chat, 'Guild Anda tidak ditemukan di basis data.', m);
    }

    if (guild.owner !== m.sender && !guild.staff.includes(m.sender)) {
        return conn.reply(m.chat, 'Anda tidak memiliki izin untuk menyerang guild lawan.', m);
    }

    conn.reply(m.chat, 'Mencari Guild Aktif 🔎', m);

    setTimeout(async () => {
        let attackedGuildId = getRandomGuildId(guildId); // Fungsi untuk mendapatkan ID guild lawan secara acak (tidak termasuk guild sendiri)
        let attackedGuild = global.db.data.guilds[attackedGuildId];

        if (!attackedGuild) {
            return conn.reply(m.chat, 'Tidak ada guild lawan yang dapat diserang saat ini.', m);
        }

        conn.reply(m.chat, `Menemukan Guild Aktif ${attackedGuild.name}`, m);

        await sleep(getRandomInt(1000, 3000)); // Jeda 1-3 detik

        let itemName = getRandomItemName(); // Fungsi untuk mendapatkan nama item secara acak

        conn.reply(m.chat, `Memulai Penyerangan Menggunakan ${itemName}`, m);

        await sleep(getRandomInt(1000, 5000)); // Jeda 1-5 detik

        conn.reply(m.chat, `${guild.name} VS ${attackedGuild.name}`, m);

        await sleep(getRandomInt(60000, 300000)); // Jeda 1-5 menit

        // Simulasi kerusakan dan pencurian
        let elixirStolen = Math.floor(attackedGuild.elixir / 2); // Mengambil setengah dari eliksir lawan
        let treasureStolen = Math.floor(attackedGuild.treasure / 2); // Mengambil setengah dari harta lawan

        attackedGuild.elixir -= elixirStolen;
        attackedGuild.treasure -= treasureStolen;

        // Update basis data
        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

        let result = guild.name === attackedGuild.name ? 'Draw' : (guild.elixir > attackedGuild.elixir ? `${guild.name} Win` : `${guild.name} Lose`);

        conn.reply(m.chat, `${result}:

Mengambil ${elixirStolen} Eliksir - ${treasureStolen} Harta dari ${attackedGuild.name}`, m);
    }, 3000); // Jeda 3 detik sebelum mencari guild lawan
};

// Fungsi untuk mendapatkan ID guild lawan secara acak (kecuali guild sendiri)
function getRandomGuildId(currentGuildId) {
    let guildIds = Object.keys(global.db.data.guilds);
    let filteredGuildIds = guildIds.filter(id => id !== currentGuildId); // Filter agar tidak termasuk guild sendiri
    let randomIndex = getRandomInt(0, filteredGuildIds.length - 1);
    return filteredGuildIds[randomIndex];
}

// Fungsi untuk mendapatkan nama item secara acak
function getRandomItemName() {
    let items = ['namaitem1', 'namaitem2', 'namaitem3']; // Ganti dengan nama-nama item yang sesuai
    let randomIndex = getRandomInt(0, items.length - 1);
    return items[randomIndex];
}

// Fungsi untuk menghasilkan angka acak dalam rentang tertentu
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Fungsi untuk membuat jeda dalam waktu tertentu
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.help = ['attackguild'];
handler.tags = ['rpgG'];
handler.command = /^attackguild$/i;

module.exports = handler;