let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`;
  try {
    const response = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${encodeURIComponent(text)}&apikey=${btc}`);
    const result = await response.json();

    if (result.status && result.result && result.result.mp4) {
      await conn.sendMessage(m.chat, { 
        video: { url: result.result.mp4 }, 
        mimetype: 'video/mp4' 
      }, { quoted: m });
    } else {
      throw 'Error: Unable to fetch video';
    }
  } catch (error) {
    throw eror
  }
};

handler.help = handler.command = ['ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.limit = true;
handler.premium = false;

module.exports = handler;
