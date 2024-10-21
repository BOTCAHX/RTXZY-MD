//import db from '../lib/database.js'
let reg = 1000
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
Berapa banyak yang ingin Anda pertaruhkan? 

📌 Contoh :
*${usedPrefix + command}* 100`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 5000
    if (new Date - users.lastslot < 5000) throw `⏳ Tunggu *${msToTime(time - new Date())}* Untuk menggunakan lagi`
    if (apuesta < 100) throw '✳️ tambahkan *MONEY* Untuk menggunakan lagi'
    if (users.money < apuesta) {
        throw `✳️ Anda tidak memiliki cukup *MONEY*\nCek MONEY mu di *.balance*`
    }

    let emojis = ["🕊️", "🦀", "🦎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `🎁 *GACOR KANG!!!* WON\n *+${apuesta + apuesta} MONEY*`
        users.money += apuesta + apuesta
    } else if (a == b || a == c || b == c) {
        end = `🔮 Lanjut lagi bang, belum stop kalau belum gacor 💲💲 \nTambahan *+${reg} money*`
        users.money += reg
    } else {
        end = `😔 Rungkad *-${apuesta} money*`
        users.money -= apuesta
    }
    users.lastslot = new Date * 1
    return await m.reply(
        `
       🎰 ┃ *gacha money* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        
${end}`) 
}
handler.help = ['slot <money>']
handler.tags = ['game']
handler.command = ['slot']
handler.group = true

module.exports = handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return seconds + " detik"
}