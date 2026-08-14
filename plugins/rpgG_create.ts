import fs from 'fs';
const dbPath = './database.json';

let handler: WaPlugin = async (m, { conn, args }) => {
    if (args.length < 1) return conn.reply(m.chat, 'Contoh penggunaan: .createguild <nama_guild>', m);
    
    let userId = m.sender;
    let guildName = args.join(' ');

    let user = global.db.data.users[userId];
    if (!user) return conn.reply(m.chat, 'Kamu belum terdaftar di dalam database.', m);
    
    if (user.money < 20000000000) {
        return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk membuat guild. Butuh 20.000.000.000 money.', m);
    }

    if (!global.db.data.users) global.db.data.users = {};
    if (!global.db.data.users[userId]) {
        global.db.data.users[userId] = {
            guild: null,
            money: 0,
            exp: 0,
            guild_exp: 0,
        };
    }
    
    if (user.guild) return conn.reply(m.chat, 'Kamu sudah tergabung dalam guild.', m);
    
    let guildId = 'guild_' + new Date().getTime();
    if (!global.db.data.guilds) global.db.data.guilds = {};
    if (!global.db.data.guilds[guildId]) {
        global.db.data.guilds[guildId] = {
            name: guildName,
            owner: userId,
            members: [userId],
            createdAt: new Date().toISOString(),
            level: 1,
            exp: 0,
            eliksir: 0,
            harta: 0,
            guardian: null,
            attack: 0,
            staff: [],
            waitingRoom: [],
        };
        user.guild = guildId;
        user.money -= 20000000000;
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
handler.rpg = true;
export default handler;