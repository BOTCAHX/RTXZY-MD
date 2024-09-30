const { youtube } = require('btch-downloader');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw` 
  try {
    const data = await youtube(text);
    await conn.sendMessage(m.chat, { 
      audio: { url: data.mp3 }, 
      mimetype: 'audio/mpeg' 
    }, { quoted: m });
  } catch (error) {
    console.error(error);
    throw eror
  }
};

handler.help = handler.command = ['ytmp3','ytv'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;

module.exports = handler;

