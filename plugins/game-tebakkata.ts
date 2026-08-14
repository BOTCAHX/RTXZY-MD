import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tbkata = conn.tbkata ? conn.tbkata : {}
    let id = m.chat
    if (id in conn.tbkata) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tbkata[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakkata?apikey=${btc}`)).json()
    let json = src
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}tkaa untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ Reply soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tbkata[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tbkata[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tbkata[id][0])
            delete conn.tbkata[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakkata']
handler.tags = ['game']
handler.command = /^tebakkata/i
handler.register = false
handler.group = true

export default handler


