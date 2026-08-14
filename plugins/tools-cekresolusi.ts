import jimp from 'jimp'
import uploadImage from '../lib/uploadImage.ts'
import uploadFile from '../lib/uploadFile.ts'

let handler: WaPlugin = async (m, { conn, usedPrefix }) => {
	
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw "where the media?"

let media = await q.download()
let isMedia = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
let link = await (isMedia ? uploadImage : uploadImage)(media)

let source = await jimp.read((await media) as Buffer)
let height = await source.getHeight()
let width = await source.getWidth()

m.reply(`*_RESOLUSI:_* ${width} x ${height}

*> Lebar :* ${width}
*> Tinggi :* ${height}

*> Link :* ${link}`)
}
handler.help = ['cekresolution *<foto>*', 'cekreso *<foto>*']
handler.tags = ['tools']
handler.command = /^(cekreso(lution)?)$/i

export default handler
