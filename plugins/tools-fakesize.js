const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

async function handler(m, { conn, usedPrefix, command, args, text }) {
	if (!text) return m.reply('kirim video/gambar/audio dengan caption .fakesize <angka>');
  	const angka = args.join` `
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!mime) throw 'Reply video/image/audio'
      const img = await q.download();
      const out = await uploadImage(img);
	let fileSizeLimit = 15 * 1024 * 1024 // 15MB ðŸ—¿
  if (img.length > fileSizeLimit) {
    throw 'Ukuran media tidak boleh melebihi 15MB'
  }
	if (/^audio/.test(mime)) {
      conn.sendMessage(m.chat, {
    audio: img,
    mimetype: 'audio/mpeg',
    fileLength: angka})
   } else if (/^video/.test(mime)) {
      conn.sendMessage(m.chat, {
    video: img,
    gifPlayback: false,
    fileLength: angka})
   } else if (/^image/.test(mime)) {
    	conn.sendMessage(m.chat, {
    image: img,
    fileLength: angka})
    } else {
      m.reply(`Kirim gambar/video/audio dengan caption *${usedPrefix + command}* <angka> atau tag gambar/video/audio yang sudah dikirim.`);
    }
}

handler.help = ['fakesize <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesize'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
