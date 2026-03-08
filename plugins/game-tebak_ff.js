let timeout = 100000
let poin = 10000
let fetch = require("node-fetch");
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakff = conn.tebakff ? conn.tebakff : {}
  let id = m.chat
  if (id in conn.tebakff) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakff[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakepep?apikey=${btc}`)).json()
  let json = src
  if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
  let caption = `
≡ _GAME TEBAK FF_

┌─⊷ *SOAL*
▢ Penjelasan: *${json.deskripsi}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tbff untuk clue jawaban
▢ *REPLY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakff[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakff[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakff[id][0])
      delete conn.tebakff[id]
    }, timeout)
  ]
}

handler.help = ['tebakff']
handler.tags = ['game']
handler.command = /^tebakff/i
handler.limit = false
handler.group = true

module.exports = handler