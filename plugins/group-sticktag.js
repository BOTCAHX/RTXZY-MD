/*
by hyzer 
cuman tes doang 🥶🙏
*/
let { webp2png } = require('../lib/webp2mp4')
let handler = async (m, { conn, usedPrefix, command }) => {
  if (!m.quoted) throw 'reply stikernya...'
  let mime = m.quoted.mimetype || ''
  if (!/webp/.test(mime)) throw 'stiker invalid'
  let media = await m.quoted.download()
  let out = Buffer.alloc(0)
  if (/webp/.test(mime)) {
    out = await webp2png(media)
  }
  conn.sendImageAsSticker(m.chat, out, m, { packname: "sticker by", author: "Hyzer" }, mentions: participants.map(a => a.id))
  })
}
handler.help = ['stickertag', 'sticktag']
handler.tags = ['tag']
handler.command = /^(stickertag|sticktag)$/i
module.exports = handler
