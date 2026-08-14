import uploadFile from '../lib/uploadFile.ts'
import uploadImage from '../lib/uploadImage.ts'
import fetch from 'node-fetch'

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command}) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!text) throw `Example ${usedPrefix} ${command} asep`;
  if (/video/g.test(mime) && (q.msg || q).seconds > 11) return m.reply('Maksimal 10 detik!')
  await m.reply(wait)
      
  try {
    let img = await q.download()
    if (!img) throw `Balas gambar/video/stiker dengan perintah ${usedPrefix} ${command}`

    let media = await uploadImage(img, "true")
    if (q.isAnimated === true) {
      let res = await fetch(`https://api.botcahx.eu.org/api/tools/webp2mp4?url=${media}&apikey=${btc}`)
      let json = await res.json()
      if (!json.result) throw 'Gagal mengubah stiker animasi ke video.'

      await conn.sendVideoAsSticker(m.chat, json.result, m, {
        packname: text || '',
        author: ''
      })
    } else {
      await conn.sendImageAsSticker(m.chat, img, m, {
        packname: text || '',
        author: ''
      })
    }
  } catch (e) {
    console.log(e)
    throw `Gagal! Balas gambar/video dengan caption *${usedPrefix} ${command}*`
  }
}

handler.help = ['wm', 'watermark']
handler.tags = ['sticker']
handler.command = /^wm|watermark?$/i
handler.limit = true;

export default handler
