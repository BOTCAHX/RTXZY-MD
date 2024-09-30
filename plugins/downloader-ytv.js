const { youtube } = require('btch-downloader');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw` 
  try {
    const data = await youtube(text);
    await conn.sendMessage(m.chat, { 
      video: { url: data.mp4 }, 
      mimetype: 'video/mp4' 
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw eror
  }
};

handler.help = handler.command = ['ytshorts', 'shorts', 'short', 'ytmp4','ytv'];
handler.tags = ['downloader'];
handler.limit = true;
handler.premium = false;

module.exports = handler;

