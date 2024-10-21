let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];

    // Cek apakah pengguna adalah pemilik guild atau memiliki peran staff
    if (!isGuildOwner(user) && !isGuildStaff(user)) {
        return conn.reply(m.chat, 'Anda tidak memiliki izin untuk melakukan ini.', m);
    }

    let target = m.mentionedJid[0];
    if (!target) return conn.reply(m.chat, 'Tag user yang ingin Anda terima di guild.', m);

    let targetUser = global.db.data.users[target];
    if (!targetUser.guildRequest) return conn.reply(m.chat, 'Tidak ada permintaan bergabung yang tertunda dari pengguna ini.', m);

    let guildName = targetUser.guildRequest;
    let guild = global.db.data.guilds[guildName];

    guild.members.push(target);
    targetUser.guild = guildName;
    delete targetUser.guildRequest;

    conn.reply(m.chat, `Permintaan bergabung dari @${target.split('@')[0]} telah diterima.`, m);
};

handler.help = ['guildaccept @user'];
handler.tags = ['rpgG'];
handler.command = /^(guildaccept)$/i;
module.exports = handler;

// Fungsi untuk mengecek apakah pengguna adalah pemilik guild
function isGuildOwner(user) {
    // Implementasi logika untuk mengecek apakah user adalah pemilik guild
    return user.role === 'owner'; // Misalnya, jika role 'owner' menunjukkan pemilik guild
}

// Fungsi untuk mengecek apakah pengguna memiliki peran staff di guild
function isGuildStaff(user) {
    // Implementasi logika untuk mengecek apakah user memiliki peran staff di guild
    return user.role === 'staff'; // Misalnya, jika role 'staff' menunjukkan staff guild
}