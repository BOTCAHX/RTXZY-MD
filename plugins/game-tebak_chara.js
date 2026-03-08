let timeout = 100000
let poin = 10000
let fetch = require("node-fetch");
let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakchara = conn.tebakchara ? conn.tebakchara : {};
  let id = m.chat
  if (id in conn.tebakchara) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakchara[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakchara?apikey=${btc}`)).json()
  let json = src
  if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
  let caption = `
≡ _GAME TEBAK KARAKTER_

┌─⊷ *SOAL*
▢ Penjelasan: *${json.result.desc}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}chrd untuk clue jawaban
▢ *REPLAY* pesan ini untuk\nmenjawab
└──────────────

    `.trim();
  conn.tebakchara[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.result.image }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakchara[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.name}*`, conn.tebakchara[id][0])
      delete conn.tebakchara[id]
    }, timeout)
  ]
}

handler.help = ['tebakchara']
handler.tags = ['game']
handler.command = /^tebakchara/i
handler.limit = false
handler.group = true

module.exports = handler