let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    conn.reply(m.chat, wait, m)
    let res = await fetch(`https://api.botcahx.eu.org/api/download/storyanime?apikey=${btc}`);
    let json = await res.json();
      conn.sendFile(m.chat, json.result.url, 'anime_story.mp4', "*STORY ANIME*", m);
  } catch (e) {
    throw `*Error:* ${eror}`;
  }
};

handler.help = ['storyanime'];
handler.tags = ['downloader'];
handler.command = /^(storyanime)$/i;
handler.limir = true 
module.exports = handler;
