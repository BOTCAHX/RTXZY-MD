import { toPTT, toAudio } from '../lib/converter.ts'

let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
    if (!/video|audio/.test(mime)) throw `Balas video/audio dengan perintah *${usedPrefix + command}*`
    let media = await q.download()
    if (!media) throw 'Media tidak dapat diunduh'
    let audio = await toAudio(media, 'mp4')
    if (!audio.data) throw 'Gagal melakukan konversi.'
    conn.sendMessage(m.chat, { audio: { url: audio.filename }, mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['toaudio (reply)']
handler.tags = ['tools']
handler.command = /^to(a(udio)?)$/i

export default handler
