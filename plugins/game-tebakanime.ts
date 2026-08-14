import type { WaGameRoom } from '../types/connection.js';
let timeout = 100000
let poin = 10000

let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
  conn.tebakanime = conn.tebakanime ? conn.tebakanime : {}
  let id = m.chat
  if (id in conn.tebakanime) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakanime[id][0])
    throw false
  }

  let json
  try {
    json = await (await fetch(`https://api.botcahx.eu.org/api/game/tebakanime?apikey=${btc}`)).json()
  } catch (e) {
    console.error(e)
    throw "Gagal mengambil data dari API, coba lagi nanti."
  }

  // Ensure the API returned a valid result
  if (!json || !json.img || !json.jawaban) throw "Terjadi kesalahan, API tidak memberikan data yang valid!"

  let caption = `
≡ _GAME TEBAK ANIME

┌─⊷ *SOAL*
▢ Deskripsi Anime: *${json.deskripsi}*
▢ Tahun rilis: *${json['tahun rilis'] || 'Tidak diketahui'}*
▢ Timeout *${(timeout / 1000).toFixed(2)} detik*
▢ Bonus: ${poin} money
▢ Ketik ${usedPrefix}tbam untuk clue jawaban
▢ *REPLY* pesan ini untuk\nmenjawab
└──────────────

    `.trim()
  conn.tebakanime[id] = [
    await conn.sendMessage(m.chat, { image: { url: json.img }, caption: caption}, { quoted: m }),
    json, poin,
    setTimeout(() => {
      if (conn.tebakanime[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn.tebakanime[id][0])
      delete conn.tebakanime[id]
    }, timeout)
  ] as unknown as WaGameRoom
}

handler.help = ['tebakanime']
handler.tags = ['game']
handler.command = /^tebakanime/i
handler.limit = false
handler.group = true

export default handler