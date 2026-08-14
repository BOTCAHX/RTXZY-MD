import type { WaGameRoom } from '../types/connection.js';
import fs from 'fs'
import path from 'path'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakislami = conn.tebakislami ? conn.tebakislami : {}
    let id = m.chat
    if (id in conn.tebakislami) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakislami[id][0])
        throw false
    }
    // Fetch data from JSON file
    let data = await (await fetch(`https://api.botcahx.eu.org/api/game/kuisislami?apikey=${btc}`)).json()
    let json = data
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
                delete conn.tebakislami[id]
            }
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakislami']
handler.tags = ['game']
handler.command = /^tebakislami/i
handler.register = false
handler.group = true

export default handler
