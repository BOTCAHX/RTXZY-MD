const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

async function handler(m, { conn, usedPrefix, command, args, text }) {
	if (!text) return m.reply('kirim video/audio dengan caption .fakesecond <angka>');
  	const angka = args.join` `
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (!mime) throw 'Reply video/audio'
      const img = await q.download();
      const out = await uploadImage(img);
      if (/^video/.test(mime)) {
      conn.sendMessage(m.chat, {
    video: {
      url: out,
    },
    gifPlayback: false,
    seconds: angka})
   } else if (/^audio/.test(mime)) {
    	conn.sendMessage(m.chat, {
    audio: {
      url: out,
    },
    seconds: angka})
    } else {
      m.reply(`Kirim audio/video dengan caption *${usedPrefix + command}* <angka> atau tag audio/video yang sudah dikirim.`);
    }
}

handler.help = ['fakesecond <angka>'];
handler.tags = ['tools'];
handler.command = ['fakesecond'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
