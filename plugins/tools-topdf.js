const uploadFile = require('../lib/uploadFile')
const uploadImage = require('../lib/uploadImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let link = await (isTele ? uploadImage : uploadFile)(media)
  conn.sendFile(m.chat, `https://api.xteam.xyz/imagetopdf?url=${link}&APIKEY=cristian9407`, 'NihKak', null, m)
}
handler.help = ['topdf <reply image>']
handler.tags = ['tools']
handler.command = /^(topdf)$/i

handler.limit = true

module.exports = handler
