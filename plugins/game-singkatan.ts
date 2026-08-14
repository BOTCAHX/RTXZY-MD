import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.singkatan = conn.singkatan ? conn.singkatan : {}
    let id = m.chat
    if (id in conn.singkatan) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.singkatan[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/singkatan?apikey=${btc}`)).json()
    let json = src
    let caption = `

┌─⊷ *SOAL*
▢ Singkatan nya: ${json.singkatan}, Tebak kepanjangannya apa?
▢ Deskripsi: ${json.deskripsi}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}sktn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
`.trim();
    conn.singkatan[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.singkatan[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.kepanjangan}*`, conn.singkatan[id][0])
            delete conn.singkatan[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['singkatan']
handler.tags = ['game']
handler.command = /^singkatan/i
handler.register = false
handler.group = true

export default handler


