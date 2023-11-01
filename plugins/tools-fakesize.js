const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

async function handler(m, { conn, usedPrefix, command, args, text }) {
	if (!text) return m.reply('kirim video/gambar dengan caption .fakesize <angka>');
  	const angka = args.join` `
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!mime) throw 'Reply video/image'
      const img = await q.download();
      const out = await uploadImage(img);
      if (/^video/.test(mime)) {
      conn.sendMessage(m.chat, {
    video: {
      url: out,
    },
    gifPlayback: false,
    fileLength: angka})
   } else if (/^image/.test(mime)) {
    	conn.sendMessage(m.chat, {
    image: {
      url: out,
    },
    fileLength: angka})
    } else {
      m.reply(`Kirim gambar/video dengan caption *${usedPrefix + command}* <angka> atau tag gambar/video yang sudah dikirim.`);
    }
}

handler.help = ['fakesize <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesize'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
