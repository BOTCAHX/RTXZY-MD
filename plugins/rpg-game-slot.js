//import db from '../lib/database.js'
let reg = 100
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
Berapa banyak yang ingin Anda pertaruhkan? 

📌 Contoh :
*${usedPrefix + command}* 100`.trim()
    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    let users = global.db.data.users[m.sender]
    let time = users.lastslot + 20000 // 20 seconds cooldown
    if (new Date - users.lastslot < 20000) throw `⏳ Tunggu *${msToTime(time - new Date())}* Untuk menggunakan lagi`
    if (apuesta < 100) throw '✳️ tambahkan *MONEY* Untuk menggunakan lagi'
    if (users.money < apuesta) {
        throw `✳️ Anda tidak memiliki cukup *MONEY*\nCek MONEY mu di *.balance*`
    }

    // Set the cooldown time at the beginning
    users.lastslot = new Date * 1

    let emojis = ["🕊️", "🦀", "🦎"];
    let x = [],
        y = [],
        z = [];
    let key = await m.reply('Memutar slot...');

    for (let i = 0; i < 3; i++) {
        x[i] = emojis[Math.floor(Math.random() * emojis.length)];
        y[i] = emojis[Math.floor(Math.random() * emojis.length)];
        z[i] = emojis[Math.floor(Math.random() * emojis.length)];
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            x[j] = emojis[Math.floor(Math.random() * emojis.length)];
            y[j] = emojis[Math.floor(Math.random() * emojis.length)];
            z[j] = emojis[Math.floor(Math.random() * emojis.length)];
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await conn.sendMessage(m.chat, { text: `
       🎰 ┃ *gacha money* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        `, edit: key });
    }

    let end;
    if (x[1] == y[1] && y[1] == z[1]) {
        end = `🎁 *GACOR KANG!!!* WON\n *+${apuesta + apuesta} MONEY*`
        users.money += apuesta + apuesta
    } else if (x[1] == y[1] || x[1] == z[1] || y[1] == z[1]) {
        end = `🔮 Lanjut lagi bang, belum stop kalau belum gacor 💲💲 \nTambahan *+${reg} money*`
        users.money += reg
    } else {
        end = `😔 Rungkad *-${apuesta} money*`
        users.money -= apuesta
    }
    await conn.sendMessage(m.chat, { text: `
       🎰 ┃ *gacha money* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        `, edit: key });
    return await m.reply(end);
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']
handler.group = true
handler.rpg = true

export default handler

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