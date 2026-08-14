import { toAudio, toPTT } from '../lib/converter.js'

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (/mp3|a(udio)?$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Balas video/audio dengan perintah *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media tidak dapat diunduh'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Gagal melakukan konversi.'
    conn.sendMessage(m.chat, { audio: { url: audio.filename }, mimetype: 'audio/mpeg' }, { quoted: m })
  }
  if (/vn|ptt$/i.test(command)) {
    if (!/video|audio/.test(mime)) throw `Balas video/audio dengan perintah *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media tidak dapat diunduh'
    let audio = await toPTT(media, 'mp4')
    if (!audio.data) throw 'Gagal melakukan konversi.'
    conn.sendMessage(m.chat, { audio: { url: audio.filename }, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: m })
  }
}
handler.help = ['tomp3', 'tovn']
handler.tags = ['voice']
handler.command = /^to(mp3|vn|ptt)$/i

export default handler
