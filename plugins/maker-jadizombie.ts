import uploadImage from '../lib/uploadImage.ts';
import fetch from 'node-fetch';
let handler: WaPlugin = async (m, { 
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
			let old = Date.now()
			let res = await fetch(`https://api.botcahx.eu.org/api/maker/jadizombie?url=${out}&apikey=${btc}`)
			let convert = await res.json()
			let buff = await fetch(convert.result)
  .then(res => res.buffer())
			await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((Date.now() - old) * 1)} ms` }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Identifikasi Gagal.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};
handler.help = ['jadizombie'];
handler.command = ['jadizombie'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = 5;
export default handler;
