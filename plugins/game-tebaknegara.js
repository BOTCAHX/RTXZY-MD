let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaknegara = conn.tebaknegara ? conn.tebaknegara : {}
    let id = m.chat
    if (id in conn.tebaknegara) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaknegara[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebaknegara?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `

┌─⊷ *SOAL TEBAK NEGARA*
▢ Deskripsi: ${json.deskripsi}
▢ Clue: ${json.clue}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}tbn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
`.trim();
    conn.tebaknegara[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaknegara[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaknegara[id][0])
            delete conn.tebaknegara[id]
        }, timeout)
    ]
}
handler.help = ['tebaknegara']
handler.tags = ['game']
handler.command = /^tebaknegara/i
handler.register = false
handler.group = true

module.exports = handler

// tested di bileys versi 6.5.0 dan sharp versi 0.30.5
// danaputra133