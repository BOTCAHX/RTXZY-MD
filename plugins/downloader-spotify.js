const fetch = require("node-fetch");

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*🚩 Masukkan URL atau judul lagu!*\n\nExample:\n${usedPrefix + command} https://open.spotify.com/track/3zakx7RAwdkUQlOoQ7SJRt\n\nExample:\n${usedPrefix + command} payung teduh`;
  if (args[0].match(/https:\/\/open.spotify.com/gi)) {
    m.reply(wait);
    try {
      const res = await fetch(`https://api.botcahx.eu.org/api/download/spotify?url=${args[0]}&apikey=${btc}`);
      let jsons = await res.json();
      const {
        thumbnail,
        title,
        name,
        duration,
        url
      } = jsons.result.data;
      const {
        id,
        type
      } = jsons.result.data.artist;
      let captionvid = ` ∘ Title: ${title}\n∘ Id: ${id}\n∘ Duration: ${duration}\n∘ Type: ${type}`;
      let pesan = await conn.reply(m.chat, captionvid, m)
      await conn.sendMessage(m.chat, { audio: { url: url }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      throw `🚩 ${eror}`;
    }
  } else { 
    m.reply(wait);
    const text = args.join(" ");
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/search/spotify?query=${text}&apikey=${btc}`);
      let json = await api.json();
      let res = json.result.data;
      let teks = "";
      for (let i in res) {
        teks += `*${parseInt(i) + 1}.* *Title:* ${res[i].title}\n`;
        teks += `*Duration:* ${res[i].duration}\n`;
        teks += `*Popularity:* ${res[i].popularity}\n`;
        teks += `*Link:* ${res[i].url}\n\n`;
      }
      await conn.reply(m.chat, teks, m)
    } catch (e) {
      throw `🚩 ${eror}`;
    }
  }
};

handler.help = ['spotify'];
handler.command = /^(spotify)$/i;
handler.tags = ['downloader'];
handler.limit = true;
module.exports = handler;
