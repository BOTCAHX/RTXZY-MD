import fs from 'fs';

const prem = 1000; // XP awarded to premium users
const free = 100; // XP awarded to free users

let handler: WaPlugin = async (m, {conn, text, isPrems}) => {
    let lastClaimTime = global.db.data.users[m.sender].lastclaim || 0;
    let currentTime = new Date().getTime();

    // Check if 24 hours (86400000 ms) have passed since the last claim
    if (currentTime - lastClaimTime < 86400000) throw `🎁 *Anda telah mengumpulkan hadiah harian Anda*\n\n🕚 Masuk kembali *${msToTime(86400000 - (currentTime - lastClaimTime))}*`;

    global.db.data.users[m.sender].exp += isPrems ? prem : free;
    m.reply(`
🎁 *HADIAH XP*
*Spam terus untuk mendapatkan xp*
cek .balance jumlah xp mu!
🆙 *XP* : +${isPrems ? prem : free}`);

    global.db.data.users[m.sender].lastclaim = currentTime;
}

handler.help = handler.command = ['daily'];
handler.tags = ['rpg'];
handler.rpg = true

export default handler;

function msToTime(duration) {
    var milliseconds = parseInt(String((duration % 1000) / 100)),
        seconds = String(Math.floor((duration / 1000) % 60)),
        minutes = String(Math.floor((duration / (1000 * 60)) % 60)),
        hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24));

    hours = "" + ((+hours < 10) ? "0" + hours : hours);
    minutes = "" + ((+minutes < 10) ? "0" + minutes : minutes);
    seconds = "" + ((+seconds < 10) ? "0" + seconds : seconds);

    return hours + " Jam " + minutes + " Menit";
}