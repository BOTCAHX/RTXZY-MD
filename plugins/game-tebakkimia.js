let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.kimia = conn.kimia ? conn.kimia : {}
    let id = m.chat
    if (id in conn.kimia) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.kimia[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakkimia?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `
*${json.nama}*

┌─⊷ *SOAL*
▢ Apa rumus kimia dari zat kimia/ senyawa di atas?
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}kmi untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.kimia[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.kimia[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.lambang}*`, conn.kimia[id][0])
            delete conn.kimia[id]
        }, timeout)
    ]
}
handler.help = ['tebakkimia']
handler.tags = ['game']
handler.command = /^tebakkimia/i
handler.register = false
handler.group = false

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133