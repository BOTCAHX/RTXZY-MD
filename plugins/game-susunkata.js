let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.susun = conn.susun ? conn.susun : {}
    let id = m.chat
    if (id in conn.susun) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.susun[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/susunkata?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Tipe: ${json.tipe}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}susn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.susun[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.susun[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.susun[id][0])
            delete conn.susun[id]
        }, timeout)
    ]
}
handler.help = ['susunkata']
handler.tags = ['game']
handler.command = /^susunkata/i
handler.register = false
handler.group = false

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133