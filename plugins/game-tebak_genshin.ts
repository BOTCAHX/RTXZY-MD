import type { WaGameRoom } from '../types/connection.js';
let timeout = 100000
let poin = 10000
import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
  conn.tebakgenshin = conn.tebakgenshin ? conn.tebakgenshin : {}
  let id = m.chat
  if (id in conn.tebakgenshin) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgenshin[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebak-genshin?apikey=${btc}`)).json()
  let json = src
  if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
  let caption = `
≡ _GAME TEBAK GENSHIN_

┌─⊷ *SOAL*
▢ Penjelasan: *${json.deskripsi}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}gca untuk clue jawaban
▢ *REPLY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakgenshin[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgenshin[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakgenshin[id][0])
      delete conn.tebakgenshin[id]
    }, timeout)
  ] as unknown as WaGameRoom
}

handler.help = ['tebakgenshin']
handler.tags = ['game']
handler.command = /^tebakgenshin/i
handler.limit = false
handler.group = true

export default handler
