let handler = async (m, { conn }) => {
    let currentTime = new Date().getTime();
    let lastClaimTime = global.db.data.users[m.sender].lastclaim || 0;
    if (currentTime - lastClaimTime < 86400000) throw `*anda sudah ngecheat!*\n\n🕚nanti lagi *${msToTime(86400000 - (currentTime - lastClaimTime))}*`;
    if (global.db.data.users[m.sender].money > 20) {
    let user = global.db.data.users[m.sender]
        global.db.data.users[m.sender]. money = 9999999
        global.db.data.users[m.sender].limit = 9999999
        global.db.data.users[m.sender].exp = 9999999
        global.db.data.users[m.sender].level = 1000
        global.db.data.users[m.sender].lastclaim = currentTime;
        m.reply(`_*SUKSES CHEAT TELAH AKTIF GUNAKAN DENGAN BIJAK*_`)
    } else {
        conn.reply(m.chat, 'miskin money nge cheat yhahaha, minimal 2jt money bos!', m);
    }
}
handler.command = /^(cheat)$/i
handler.owner = false
handler.premium = false
handler.rpg = true


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