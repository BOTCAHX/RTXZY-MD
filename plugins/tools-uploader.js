const uploadImage = require('../lib/uploadImage')

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  let media = await q.download()
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  
  let fileSizeLimit = 5 * 1024 * 1024 // 5MB 🗿
  if (media.length > fileSizeLimit) {
    throw 'Ukuran media tidak boleh melebihi 5MB'
  }
  
  let link = await (isTele ? uploadImage : uploadImage)(media)
  m.reply(`${link}\n${media.length} Byte(s)`);
}

handler.help = ['tourl <reply image>']
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i

module.exports = handler
