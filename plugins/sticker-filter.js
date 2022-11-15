const uploadImage = require('../lib/uploadImage')
const { sticker } = require('../lib/sticker')
let fetch = require('node-fetch')
const { MessageType } = require('@adiwajshing/baileys')
const effects = ['greyscale', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'pixelate', 'blur']

let handler = async (m, { conn, usedPrefix, text, command }) => {
  let effect = text.trim().toLowerCase()
  if (!effects.includes(effect)) throw `
┌─「 *Daftar Efek* 」
${effects.map(effect => `├ ${effect}`).join('\n')}
└────
Penggunaan:
${usedPrefix + command} <efek>
Contoh:
${usedPrefix + command} greyscale
`.trim()
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw `Balas gambar dengan perintah *${usedPrefix + command}*`
  if (!/image\/(jpe?g|png)/.test(mime)) throw `Media tidak didukung!`
  let img = await q.download()
  let url = await uploadImage(img)
  let apiUrl = API('https://some-random-api.ml/canvas/', encodeURIComponent(effect), {
    avatar: url
  })
  try {
    let stiker = await sticker(null, apiUrl, packname, author)
    await conn.sendFile(m.chat, stiker, '', '', m, 0, { asSticker: true })
  } catch (e) {
    await conn.sendFile(m.chat, apiUrl, 'image.png', null, m, 0, { thumbnail: await (await fetch(apiUrl)).buffer() })
  }
}
handler.help = ['stikerfilter']
handler.tags = ['sticker']
handler.command = /^(s(tic?ker)?filter)$/i

module.exports = handler
