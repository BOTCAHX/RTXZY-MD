let fetch = require('node-fetch')

let timeout = 100000
let poin = 500
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakbendera2 = conn.tebakbendera2 ? conn.tebakbendera2 : {}
    let id = m.chat
    if (id in conn.tebakbendera2) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbendera2[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakbendera?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `
${json.bendera}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}teii untuk bantuan
▢ Bonus: ${poin} Kredit sosial
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakbendera2[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakbendera2[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.nama}*`, conn.tebakbendera2[id][0])
            delete conn.tebakbendera2[id]
        }, timeout)
    ]
}
handler.help = ['tebakbendera']
handler.tags = ['game']
handler.command = /^tebakbendera/i
handler.register = false
handler.group = true

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133