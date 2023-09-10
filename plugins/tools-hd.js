const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage')

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
      const img = await q.download();
      const out = await uploadImage(img);
      m.reply(wait);
      if (command === 'hd') {
        const api = await fetch(`https://api.botcahx.live/api/tools/remini?url=${out}&apikey=${btc}`);
        const image = await api.json();
        const { url } = image;
        conn.sendFile(m.chat, url, null, wm, m);
      } else if (command === 'hd2') {       
        try {
          const api = await fetch(`https://api.botcahx.live/api/tools/remini-v2?url=${out}&apikey=${btc}`);
          const response = await api.text();
          let image;
          try {
            image = JSON.parse(response);
          } catch (error) {
            console.error(`parse: ${error}`);
            return;
          }
          const { url } = image;
          conn.sendFile(m.chat, url, null, wm, m);
        } catch (error) {
          throw error;
        }
      } else if (command === 'hd3') {
        const api = await fetch(`https://api.botcahx.live/api/tools/remini-v3?url=${out}&resolusi=4&apikey=${btc}`);
        const image = await api.json();
        const url = image.url.url;
        conn.sendFile(m.chat, url, null, wm, m);
       } else if (command === 'removebg' || command === 'nobg') {
        const api = await fetch(`https://api.botcahx.live/api/tools/removebg?url=${out}&apikey=${btc}`);
        const image = await api.json();
        const url = image.url.result;
        conn.sendFile(m.chat, url, null, wm, m);
      }
    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
  } catch (e) {
    console.error(e);
    throw `🚩 *Server Error*`
  }
}

handler.command = handler.help = ['hd', 'hd2', 'hd3','removebg','nobg'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
