const fetch = require('node-fetch');

let handler = async (m, {
  conn,
  text,
  usedPrefix,
  command
}) => {
  if (command == 'tiktokslide' || command == 'ttslide') {
    if (!text) throw `Masukkan URL!\n\ncontoh: ${usedPrefix + command} https://vt.tiktok.com/ZS2qsMU1W/`;
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/download/tiktokslide?url=${text}&apikey=${btc}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.chat,{ image :{ url : i } , caption : `*Title*: ${res.result.title}` }, { quoted: m });         
      }
        conn.sendMessage(m.chat, { audio: { url: res.result.audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      console.log(e);
      throw `🚩 *Terjadi kesalahan!*`;
    }
  }
  if (command == 'douyinslide' || command == 'douyinfoto') { 
    if (!text) throw `Masukkan URL!\n\ncontoh: ${usedPrefix + command} https://v.douyin.com/i2bPkLLo/`;
    try {
      const api = await fetch(`https://api.botcahx.eu.org/api/download/douyinslide?url=${text}&apikey=${btc}`);
      const res = await api.json();
      for (let i of res.result.images) {
        await sleep(3000);
        conn.sendMessage(m.chat,{ image :{ url : i } , caption : `*Title*: ${res.result.title}` }, { quoted: m });         
      }
        conn.sendMessage(m.chat, { audio: { url: res.result.audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
    } catch (e) {
      console.log(e);
      throw `🚩 *Terjadi kesalahan!*`;
    }
  }
};

handler.command = handler.help = ['douyinslide', 'douyinfoto','ttslide','tiktokslide'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
