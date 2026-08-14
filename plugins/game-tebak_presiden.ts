import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakpresiden = conn.tebakpresiden ? conn.tebakpresiden : {}
    let id = m.chat
    if (id in conn.tebakpresiden) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakpresiden[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakpresiden?apikey=${btc}`)).json()
    let json = src
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}pra untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ reply soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakpresiden[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakpresiden[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakpresiden[id][0])
            delete conn.tebakpresiden[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakpresiden']
handler.tags = ['game']
handler.command = /^tebakpresiden/i
handler.register = false
handler.group = true

export default handler

