const uploadImage = require('../lib/uploadImage');
const fetch = require("node-fetch");
let handler = async (m, { 
conn, 
usedPrefix, 
command
 }) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, wait, m)
		try {
			const img = await q.download?.()
			let out = await uploadImage(img)
			let data = await (await fetch(`https://api.botcahx.eu.org/api/tools/img2prompt?url=${out}&apikey=${btc}`)).json()
			await m.reply(data.result)
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Identifikasi Gagal.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};
handler.help = ['img2prompt'];
handler.command = ['img2prompt'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;
module.exports = handler;
