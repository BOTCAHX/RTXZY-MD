import type { WaGameRoom } from '../types/connection.js';
import fetch from 'node-fetch'

let timeout = 100000
let poin = 10000
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebaknegara = conn.tebaknegara ? conn.tebaknegara : {}
    let id = m.chat
    if (id in conn.tebaknegara) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaknegara[id][0])
        throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebaknegara?apikey=${btc}`)).json()
    let json = src
    let caption = `

┌─⊷ *SOAL TEBAK NEGARA*
▢ Deskripsi: ${json.deskripsi}
▢ Clue: ${json.clue}
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Ketik ${usedPrefix}tbn untuk bantuan
▢ Bonus: ${poin} money
▢ *Balas/ replay soal ini untuk menjawab*
└──────────────
`.trim();
    conn.tebaknegara[id] = [
        await conn.reply(m.chat, caption, m),
        json, poin,
        setTimeout(() => {
            if (conn.tebaknegara[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebaknegara[id][0])
            delete conn.tebaknegara[id]
        }, timeout)
    ] as unknown as WaGameRoom
}
handler.help = ['tebaknegara']
handler.tags = ['game']
handler.command = /^tebaknegara/i
handler.register = false
handler.group = true

export default handler

