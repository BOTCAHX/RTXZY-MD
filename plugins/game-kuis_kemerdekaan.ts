import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (id in conn.merdeka) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.merdeka[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/kuismerdeka?apikey=${btc}`)).json()
    let json = src
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
    ] as unknown as WaGameRoom
}
handler.help = ['kuismerdeka']
handler.tags = ['game']
handler.command = /^kuismerdeka/i
handler.register = false
handler.group = true

export default handler

