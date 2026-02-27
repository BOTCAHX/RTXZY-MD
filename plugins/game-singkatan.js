let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.singkatan = conn.singkatan ? conn.singkatan : {}
    let id = m.chat
    if (id in conn.singkatan) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.singkatan[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/singkatan?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `

┌─⊷ *SOAL*
▢ Singkatan nya: ${json.singkatan}, Tebak kepanjangannya apa?
▢ Deskripsi: ${json.deskripsi}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}sktn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
`.trim();
    conn.singkatan[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.singkatan[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.kepanjangan}*`, conn.singkatan[id][0])
            delete conn.singkatan[id]
        }, timeout)
    ]
}
handler.help = ['singkatan']
handler.tags = ['game']
handler.command = /^singkatan/i
handler.register = false
handler.group = true

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133
