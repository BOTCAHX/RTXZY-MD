let timeout = 100000
let poin = 1000
let fetch = require("node-fetch");
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakml = conn.tebakml ? conn.tebakml : {}
  let id = m.chat
  if (id in conn.tebakml) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakml[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakheroml?apikey=${btc}`)).json()
  let json = src
  if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
  let caption = `
≡ _TEBAK HERO ML_

┌─⊷ *SOAL*
▢ Deskripsi: *${json.deskripsi}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tml untuk clue jawaban
▢ *REPLY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakml[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.fullimg }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakml[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakml[id][0])
      delete conn.tebakml[id]
    }, timeout)
  ]
}

handler.help = ['tebakml']
handler.tags = ['game']
handler.command = /^tebakml/i
handler.limit = false
handler.group = true

module.exports = handler
