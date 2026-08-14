import uploadFile from '../lib/uploadFile.ts'
import uploadImage from '../lib/uploadImage.ts'

let handler: WaPlugin = async (m) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Tidak ada media yang ditemukan'
  let media = await q.download()
  if (!media || media.length === 0) throw 'Gagal mengunduh media, coba lagi'
  let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
  let fileSizeLimit = 5 * 1024 * 1024 
  if (media.length > fileSizeLimit) {
    throw 'Ukuran media tidak boleh melebihi 5MB'
  }
  let link = await (isTele ? uploadImage : uploadFile)(media)
  m.reply(`${link}
${media.length} Byte(s)
${isTele ? '(Tidak Ada Tanggal Kedaluwarsa)' : '(Tidak Ada Tanggal Kedaluwarsa)'}`)
}
handler.help = ['tourl <reply image>']
handler.tags = ['tools']
handler.command = /^(upload|tourl)$/i
handler.limit = true
export default handler
