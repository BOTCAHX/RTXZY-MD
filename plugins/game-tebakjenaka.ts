import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 500
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakjenaka = conn.tebakjenaka ? conn.tebakjenaka : {}
    let id = m.chat
    if (id in conn.tebakjenaka) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakjenaka[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakjenaka?apikey=${btc}`)).json()
    let json = src
    let caption = `
${json.pertanyaan}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}tbk untuk bantuan
▢ Bonus: ${poin} Kredit sosial
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakjenaka[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakjenaka[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakjenaka[id][0])
            delete conn.tebakjenaka[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakjenaka']
handler.tags = ['game']
handler.command = /^tebakjenaka/i
handler.register = false
handler.group = false

export default handler

