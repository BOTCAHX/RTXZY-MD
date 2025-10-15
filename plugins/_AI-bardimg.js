const fetch = require('node-fetch');
const uploader = require('../lib/uploadImage');
const uploadFile = require('../lib/uploadFile');

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  let media, baseUrl;
  
  await m.reply(wait);
  
  try {
    if (/image/.test(mime) && !/webp/.test(mime)) {
      let buffer = await q.download();
      media = await uploader(buffer);
      baseUrl = `https://api.botcahx.eu.org/api/search/bard-img?url=${media}&text=${text}&apikey=${btc}`;
    } 
    else if (/video/.test(mime)) {
      if (q.seconds > 60) throw 'Maximum video duration is 60 seconds!';
      let buffer = await q.download();
      media = await uploadFile(buffer);
      baseUrl = `https://api.botcahx.eu.org/api/search/bard-video?url=${media}&text=${text}&apikey=${btc}`;
    }
    else if (/audio/.test(mime)) {
      let buffer = await q.download();
      media = await uploadFile(buffer);
      baseUrl = `https://api.botcahx.eu.org/api/search/bard-audio?url=${media}&text=${text}&apikey=${btc}`;
    }
    else {
      throw `Kirim media dengan caption *${usedPrefix + command} pertanyaan* atau tag media yang sudah dikirim.`;
    }

    let json = await (await fetch(baseUrl)).json();
    if (json.status && json.result) {
      conn.sendMessage(m.chat, { text: json.result }, { quoted: m });
    } else {
      throw 'Failed to get response from Gemini!';
    }
    
  } catch (err) {
    console.error(err);
    throw `[ ! ] Terjadi kesalahan saat memproses media.\n\nKirim media dengan caption *${usedPrefix + command} pertanyaan* atau tag media yang sudah dikirim.`;
  }
}

handler.help = ['bardimg', 'bardimage', 'bardvideo', 'bardaudio', 'geminiimg', 'geminiimage', 'geminivideo', 'geminiaudio'];
handler.tags = ['ai'];
handler.command = /^(bardimg|bardimage|bardvideo|bardaudio|geminiimg|geminiimage|geminivideo|geminiaudio)$/i;

handler.limit = true;

module.exports = handler;
