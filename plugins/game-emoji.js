let fetch = require('node-fetch')

let timeout = 100000
let poin = 1000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (id in conn.tebakemoji) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakemoji[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakemoji?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `
    *TEBAK EMOJI*
Emoji nya: ${json.emoticon} 

┌─⊷ *SOAL*
▢ ${json.soal}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}hemo untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ reply soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakemoji[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakemoji[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n\nDeskripsi: ${json.deskripsi}`, conn.tebakemoji[id][0])
            delete conn.tebakemoji[id]
        }, timeout)
    ]
}
handler.help = ['tebakemoji']
handler.tags = ['game']
handler.command = /^tebakemoji/i
handler.register = false
handler.group = true

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133