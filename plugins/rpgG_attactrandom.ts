import fs from 'fs';
const dbPath = './database.json';

let handler: WaPlugin = async (m, { conn }) => {
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
        let attackedGuildId = getRandomGuildId(guildId); // Random enemy guild ID (excluding own guild)
        let attackedGuild = global.db.data.guilds[attackedGuildId];

        if (!attackedGuild) {
            return conn.reply(m.chat, 'Tidak ada guild lawan yang dapat diserang saat ini.', m);
        }

        conn.reply(m.chat, `Menemukan Guild Aktif ${attackedGuild.name}`, m);

        await sleep(getRandomInt(1000, 3000)); // Delay 1-3 seconds

        let itemName = getRandomItemName();

        conn.reply(m.chat, `Memulai Penyerangan Menggunakan ${itemName}`, m);

        await sleep(getRandomInt(1000, 5000)); // Delay 1-5 seconds

        conn.reply(m.chat, `${guild.name} VS ${attackedGuild.name}`, m);

        await sleep(getRandomInt(60000, 300000)); // Delay 1-5 minutes

        // Simulate damage and theft
        let elixirStolen = Math.floor(attackedGuild.elixir / 2); // Take half of the enemy's elixir
        let treasureStolen = Math.floor(attackedGuild.treasure / 2); // Take half of the enemy's treasure

        attackedGuild.elixir -= elixirStolen;
        attackedGuild.treasure -= treasureStolen;

        fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));

        let result = guild.name === attackedGuild.name ? 'Draw' : (guild.elixir > attackedGuild.elixir ? `${guild.name} Win` : `${guild.name} Lose`);

        conn.reply(m.chat, `${result}:

Mengambil ${elixirStolen} Eliksir - ${treasureStolen} Harta dari ${attackedGuild.name}`, m);
    }, 3000); // 3-second delay before finding an enemy guild
};

// Get a random enemy guild ID (excluding own guild)
function getRandomGuildId(currentGuildId) {
    let guildIds = Object.keys(global.db.data.guilds);
    let filteredGuildIds = guildIds.filter(id => id !== currentGuildId); // Exclude the current guild
    let randomIndex = getRandomInt(0, filteredGuildIds.length - 1);
    return filteredGuildIds[randomIndex];
}

function getRandomItemName() {
    let items = ['namaitem1', 'namaitem2', 'namaitem3']; // Replace with the actual item names
    let randomIndex = getRandomInt(0, items.length - 1);
    return items[randomIndex];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

handler.help = ['attackguild'];
handler.tags = ['rpgG'];
handler.command = /^attackguild$/i;
handler.rpg = true
export default handler;