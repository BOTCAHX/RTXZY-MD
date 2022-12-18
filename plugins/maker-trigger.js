const uploadImage = require('../lib/uploadImage')
const uploadFile = require('../lib/uploadFile')
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')
let fs = require('fs')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
    	let ztick = fs.readFileSync(`./media/sticker/emror.webp`)
    	try {
			let img = await q.download?.()
			let out = await uploadImage(img)
			const res = `https://api.tiodevhost.my.id/api/maker/trigger?url=${out}`
			const stiker = await sticker(false, res, global.packname, global.author)
	        await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
    	} catch (e) {
    		console.log(e)
	        await conn.sendFile(m.chat, ztick, 'stick.webp', '', m)
    	}
    } else {
    	m.reply(`Kirim gambar dengan caption\n*${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
    }
}

handler.help = ['trigger']
handler.tags = ['sticker']
handler.command = /^(trigger(ed)?)$/i

handler.premium = false
handler.limit = true

module.exports = handler
