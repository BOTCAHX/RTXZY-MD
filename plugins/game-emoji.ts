import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 1000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakemoji = conn.tebakemoji ? conn.tebakemoji : {}
    let id = m.chat
    if (id in conn.tebakemoji) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakemoji[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakemoji?apikey=${btc}`)).json()
    let json = src
    let caption = `
    *TEBAK EMOJI*
Emoji nya: ${json.emoticon} 

┌─⊷ *SOAL*
▢ ${json.soal}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}hemo untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ reply soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakemoji[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakemoji[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*\n\nDeskripsi: ${json.deskripsi}`, conn.tebakemoji[id][0])
            delete conn.tebakemoji[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakemoji']
handler.tags = ['game']
handler.command = /^tebakemoji/i
handler.register = false
handler.group = true

export default handler

