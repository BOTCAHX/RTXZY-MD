const fs = require('fs');

const prem = 1000; // xp yang didapat untuk user prem
const free = 100; // xp yang didapat untuk user free

let handler = async (m, {conn, text, isPrems}) => {
    let lastClaimTime = global.db.data.users[m.sender].lastclaim || 0;
    let currentTime = new Date().getTime();

    // Cek apakah sudah 24 jam (86400000 ms) sejak klaim terakhir
    if (currentTime - lastClaimTime < 86400000) throw `🎁 *Anda telah mengumpulkan hadiah harian Anda*\n\n🕚 Masuk kembali *${msToTime(86400000 - (currentTime - lastClaimTime))}*`;

    // Tambahkan XP sesuai jenis user
    global.db.data.users[m.sender].exp += isPrems ? prem : free;
    m.reply(`
🎁 *HADIAH XP*
*Spam terus untuk mendapatkan xp*
cek .balance jumlah xp mu!
🆙 *XP* : +${isPrems ? prem : free}`);

    // Update waktu klaim terakhir
    global.db.data.users[m.sender].lastclaim = currentTime;
}

handler.help = handler.command = ['daily'];
handler.tags = ['rpg'];

module.exports = handler;

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return hours + " Jam " + minutes + " Menit";
}
