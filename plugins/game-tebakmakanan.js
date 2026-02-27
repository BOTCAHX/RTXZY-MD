let timeout = 100000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakmakanan = conn.tebakmakanan ? conn.tebakmakanan : {}
  let id = m.chat
  if (id in conn.tebakmakanan) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakmakanan[id][0])
    throw false
  }
  let src = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakmakanan?apikey=${btc}`)).json()
  let json = src
  if (!json) throw "Terjadi kesalahan, ulangi lagi perintah!"
  let caption = `
≡ _GAME TEBAK MAKANAN_

┌─⊷ *SOAL*
▢ Penjelasan: *${json.deskripsi}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tebma untuk clue jawaban
▢ *REPLY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakmakanan[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakmakanan[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakmakanan[id][0])
      delete conn.tebakmakanan[id]
    }, timeout)
  ]
}

handler.help = ['tebakmakanan']
handler.tags = ['game']
handler.command = /^tebakmakanan/i
handler.limit = false
handler.group = true

module.exports = handler