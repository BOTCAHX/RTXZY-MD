let timeout = 100000
let poin = 10000

let handler = async (m, { conn, usedPrefix }) => {
  conn.tebakbuah = conn.tebakbuah ? conn.tebakbuah : {}
  let id = m.chat
  if (id in conn.tebakbuah) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakbuah[id][0])
    throw false
  }

  let json
  try {
    json = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakbuah?apikey=${btc}`)).json()
  } catch (e) {
    console.error(e)
    throw "Gagal mengambil data dari API, coba lagi nanti."
  }

  // Pastikan API memberikan hasil yang valid
  if (!json || !json.img || !json.jawaban) throw "Terjadi kesalahan, API tidak memberikan data yang valid!"

  let caption = `
≡ _GAME TEBAK BUAH

┌─⊷ *SOAL*
▢ Deskripsi Buah: *${json.deskripsi}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tbau untuk clue jawaban
▢ *REPLAY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakbuah[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakbuah[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakbuah[id][0])
      delete conn.tebakbuah[id]
    }, timeout)
  ]
}

handler.help = ['tebakbuah']
handler.tags = ['game']
handler.command = /^tebakbuah/i
handler.limit = false
handler.group = true

module.exports = handler