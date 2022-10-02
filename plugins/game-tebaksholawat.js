/*

   Created By Sekhaa
   Stay halal brother*

*/


let fetch = require('node-fetch')

let timeout = 60000
let poin = 127
let handler = async (m, { conn, usedPrefix }) => {
    conn.tebaksholawat = conn.tebaksholawat ? conn.tebaksholawat : {}
    let id = m.chat
    if (id in conn.tebaksholawat) {
        conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaksholawat[id][0])
        throw false
    }
    let res = await fetch(API('rey', '/api/game/tebaksholawat', {}, 'apikey'))
    if (!res.ok) throw await `${res.status} ${res.statusText}`
    if (!res.ok) throw eror
    let json = await res.json()
    let caption = `
TEBAK SHOLAWAT
Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik *${usedPrefix}shola* untuk bantuan
Bonus: ${poin} XP
*Balas pesan ini untuk menjawab!*`.trim()
    conn.tebaksholawat[id] = [
        await m.reply(caption),
        json, poin,
        setTimeout(async () => {
            if (conn.tebaksholawat[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.judul}*`, '© sekha', 'Tebak Sholawat', `.tebaksholwat`, conn.tebaksholawat[id][0])
            delete conn.tebaksholawat[id]
        }, timeout)
    ]
    await conn.sendFile(m.chat, json.sholawat, 'eror.mp3', '', m, 1, { mimetype: 'audio/mp4' })
}
handler.help = ['tebaksholawat']
handler.tags = ['game']
handler.command = /^tebaksholawat$/i
handler.limit = true

module.exports = handler
