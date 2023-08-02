const fetch = require("node-fetch");
const FormData = require('form-data');
const { fromBuffer } = require('file-type');
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
			let out = await uploader(img)
			let old = new Date()
			let res = await fetch(`https://api.botcahx.live/api/maker/jadianime?url=${out}&apikey=${btc}`)
			let convert = await res.json()
			let buff = await fetch(convert.result.img_crop_single)
  .then(res => res.buffer())
			await conn.sendMessage(m.chat, { image: buff, caption: `🍟 *Fetching* : ${((new Date - old) * 1)} ms` }, { quoted: m })
		} catch (e) {
			console.log(e)
			m.reply(`[ ! ] Identifikasi Gagal.`)
		}
	} else {
		m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`)
	}
};
handler.help = ['jadianime'];
handler.command = ['toanime', 'jadianime'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = 5;
module.exports = handler;

async function uploader(buffer) {
  const { ext } = await fromBuffer(buffer);
  let form = new FormData();
  form.append('file', buffer, 'tmp.' + ext);
  let res = await fetch('https://cdn.btch.bz/upload', {
    method: 'POST',
    body: form
  });
  let img = await res.json();
  if (img.error) throw img.error;
  return 'https://cdn.btch.bz' + img[0].src;
}
