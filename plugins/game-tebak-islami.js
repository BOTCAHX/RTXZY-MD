let fs = require('fs')
let path = require('path')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebakislami = conn.tebakislami ? conn.tebakislami : {}
    let id = m.chat
    if (id in conn.tebakislami) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakislami[id][0])
        throw false
    }
    // di sini dia ngambil data dari file JSON
    let data = await (await fetch(`https://api.botcahx.eu.org/api/game/kuisislami?apikey=${btc}`)).json()
    let json = data
    // buat caption buat di tampilin di wa
    let options = json.pilihan.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')
    let caption = `
${json.soal}

${options}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tsa untuk clue jawaban
▢ *Balas/ reply soal ini untuk menjawab dengan a, b, c, atau d*
└──────────────
`.trim()
    conn.tebakislami[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakislami[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakislami[id][0])
                delete conn.tebakislami[id] // Automatically delete the question
            }
        }, timeout)
    ]
}
handler.help = ['tebakislami']
handler.tags = ['game']
handler.command = /^tebakislami/i
handler.register = false
handler.group = true

module.exports = handler
