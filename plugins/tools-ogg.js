const { toAudio, toPTT } = require('../lib/converter')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (/mp3|a(udio)?$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Balas video/audio dengan perintah *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media tidak dapat diunduh'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Gagal melakukan konversi.'
    conn.sendMessage(m.chat, {document: audio.data, mimetype: 'audio/mpeg', fileName: `audio.mp3`}, { quoted : m })
  }
  if (/vn|ptt$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Balas video/audio dengan perintah *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media tidak dapat diunduh'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Gagal melakukan konversi.'
    await conn.sendFile(m.chat, audio.data, 'file.mp4', '', m, 1, { mimetype: 'audio/mp4' })
  }
}
handler.help = ['tomp3', 'tovn']
handler.tags = ['Pengubah Suara']
handler.command = /^to(mp3|vn|ptt)$/i

module.exports = handler
