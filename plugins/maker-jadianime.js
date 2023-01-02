const uploadImage = require("../lib/uploadFile.js");
var handler = async (m, { 
conn, 
usedPrefix, 
command
 }) => {
	var q = m.quoted ? m.quoted : m
	var mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			var img = await q.download?.()
			var out = await uploadImage(img)
			await conn.sendMessage(m.chat, { image: { url: `https://restapi.frteam.xyz/toanime?img=${out}&apikey=Fikrii` }, caption: `*Jadi Anime*` }, { quoted: m })
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
