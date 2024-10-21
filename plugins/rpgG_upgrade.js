let handler = async (m, { conn, args }) => {
    let userId = m.sender;
    let user = global.db.data.users[userId];
    let upgradeType = args[0];

    if (!user.guild) return conn.reply(m.chat, 'Kamu belum tergabung dalam guild.', m);

    let guildId = user.guild;
    let guild = global.db.data.guilds[guildId];
    if (!guild) return conn.reply(m.chat, 'Guild tidak ditemukan.', m);

    if (!upgradeType) return conn.reply(m.chat, 'Pilih jenis upgrade yang ingin kamu lakukan (level, eliksir, harta, guardian, attack).', m);

    switch (upgradeType.toLowerCase()) {
        case 'level':
            if (user.money < 5000000000) return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk upgrade level guild. Butuh 5.000.000.000 money.', m);

            guild.level++;
            user.money -= 5000000000;
            conn.reply(m.chat, `Level guild ${guild.name} telah ditingkatkan menjadi ${guild.level}.`, m);
            break;
        case 'eliksir':
            if (user.money < 1000000000) return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk upgrade eliksir guild. Butuh 1.000.000.000 money.', m);

            guild.eliksir++;
            user.money -= 1000000000;
            conn.reply(m.chat, `Eliksir guild ${guild.name} telah ditingkatkan menjadi ${guild.eliksir}.`, m);
            break;
        case 'harta':
            if (user.money < 2000000000) return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk upgrade harta guild. Butuh 2.000.000.000 money.', m);

            guild.harta++;
            user.money -= 2000000000;
            conn.reply(m.chat, `Harta guild ${guild.name} telah ditingkatkan menjadi ${guild.harta}.`, m);
            break;
        case 'guardian':
            if (user.money < 3000000000) return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk upgrade guardian guild. Butuh 3.000.000.000 money.', m);

            guild.guardian++;
            user.money -= 3000000000;
            conn.reply(m.chat, `Guardian guild ${guild.name} telah ditingkatkan menjadi ${guild.guardian}.`, m);
            break;
        case 'attack':
            if (user.money < 4000000000) return conn.reply(m.chat, 'Kamu tidak memiliki cukup money untuk upgrade attack guild. Butuh 4.000.000.000 money.', m);

            guild.attack++;
            user.money -= 4000000000;
            conn.reply(m.chat, `Attack guild ${guild.name} telah ditingkatkan menjadi ${guild.attack}.`, m);
            break;
        default:
            conn.reply(m.chat, 'Pilih jenis upgrade yang valid: level, eliksir, harta, guardian, attack.', m);
            break;
    }

    fs.writeFileSync(dbPath, JSON.stringify(global.db.data, null, 2));
};

handler.help = ['guildupgrade <level/eliksir/harta/guardian/attack>'];
handler.tags = ['rpgG'];
handler.command = /^(guildupgrade)$/i;
module.exports = handler;