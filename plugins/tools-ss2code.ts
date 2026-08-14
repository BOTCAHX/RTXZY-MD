import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.ts'
let handler: WaPlugin = async (m, { 
conn, 
usedPrefix, 
command
 }) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
	       await conn.reply(m.chat, wait, m)
			const img = await q.download?.()
			let out = await uploadImage(img)
			let res = await fetch(`https://api.botcahx.eu.org/api/tools/ss2code?url=${out}&apikey=${btc}`)
			let json = await res.json()
		    await m.reply(json.result)
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Identifikasi Code gagal.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};
handler.help = ['ss2code'];
handler.command = ['ss2code'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;

export default handler;
