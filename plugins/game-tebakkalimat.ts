import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 500
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakkalimat = conn.tebakkalimat ? conn.tebakkalimat : {}
    let id = m.chat
    if (id in conn.tebakkalimat) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakkalimat[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakkalimat?apikey=${btc}`)).json()
    let json = src
    let caption = `
${json.soal}

┌─⊷ *SOAL*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}tela untuk bantuan
▢ Bonus: ${poin} Kredit sosial
▢ *Balas/ REPLY soal ini untuk menjawab*
└──────────────
`.trim()
    conn.tebakkalimat[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebakkalimat[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakkalimat[id][0])
            delete conn.tebakkalimat[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebakkalimat']
handler.tags = ['game']
handler.command = /^tebakkalimat/i
handler.register = false
handler.group = true

export default handler

