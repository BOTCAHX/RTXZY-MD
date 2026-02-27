let fetch = require('node-fetch')

let timeout = 100000
let poin = 10000
let handler = async (m, { conn, usedPrefix }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (id in conn.merdeka) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.merdeka[id][0])
        throw false
    }
    // di sini dia ngambil data dari api
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/kuismerdeka?apikey=${btc}`)).json()
    let json = src
    // buat caption buat di tampilin di wa
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}mka untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.merdeka[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.merdeka[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.merdeka[id][0])
            delete conn.merdeka[id]
        }, timeout)
    ]
}
handler.help = ['kuismerdeka']
handler.tags = ['game']
handler.command = /^kuismerdeka/i
handler.register = false
handler.group = true

module.exports = handler

// tested di bileys versi 6.7.9 dan sharp versi 0.30.5
// danaputra133