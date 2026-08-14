import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakkode = conn.tebakkode ? conn.tebakkode : {}
    let id = m.chat
    if (id in conn.tebakkode) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkode[id][0])
        throw false
    }
    // Fetch question data from the API
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakkode?apikey=${btc}`)).json()
    let json = src
    let options = json.pilihan.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`).join('\n')
    let caption = `
${json.soal}

${options}

┌─⊷ *SOAL*
▢ Bahasa: *${json.bahasa}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}kdo untuk clue jawaban
▢ *Balas/ reply soal ini untuk menjawab dengan a, b, c, atau d*
└──────────────
`.trim()
    conn.tebakkode[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkode[id]) {
                conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkode[id][0])
                delete conn.tebakkode[id]
            }
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakkode']
handler.tags = ['game']
handler.command = /^tebakkode/i
handler.register = false
handler.group = true

export default handler

// Tested on Baileys 6.5.0 and sharp 0.30.5
