import type { WaGameRoom } from '../types/connection.js';
  let timeout = 100000
  let poin = 10000
  import fetch from 'node-fetch';
  let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
    conn.tebakmeme = conn.tebakmeme ? conn.tebakmeme : {}
    let id = m.chat
    if (id in conn.tebakmeme) {
      conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakmeme[id][0])
      throw false
    }
    let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakmeme?apikey=${btc}`)).json()
    let json = src
    if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
    let caption = `
  ≡ _GAME TEBAK MEME_

  ┌─⊷ *SOAL*
  ▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
  ▢ Bonus: ${poin} money
  ▢ Hint: ${json.Hint}
  ▢ *REPLAY* pesan ini untuk\nmenjawab
  └──────────────
      `.trim();
    let caption2 = `Waktu habis!\nJawabannya adalah *${json.Jawaban}*`;
    conn.tebakmeme[id] = [
      await conn.sendMessage(m.chat, { image: { url: json.imgFilter }, caption: caption}, { quoted: m }),
      json, poin,
      setTimeout(() => {
        if (conn.tebakmeme[id]) conn.sendMessage(m.chat,  { image: { url: json.Img }, caption: caption2},{ quoted: m }, conn.tebakmeme[id][0])
        delete conn.tebakmeme[id]
      }, timeout)
    ] as unknown as WaGameRoom
  }

  handler.help = ['tebakmeme']
  handler.tags = ['game']
  handler.command = /^tebakmeme/i
  handler.limit = false
  handler.group = true

  export default handler