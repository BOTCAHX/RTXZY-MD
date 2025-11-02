let fetch = require('node-fetch')
let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Masukkan No Surah!\n\ncontoh: ${usedPrefix + command} 2`;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/surah?no=${text}&apikey=${btc}`);
  let json = await res.json()
  if (!json.status || !json.result) throw `Surah tidak ditemukan!`;
  var srh = json.result.slice(0, 10).map((v, i) => `―-SURAH-―\n\nArab: ${v.arab}\n\nRumi: ${v.rumi}\n\nLatin: ${v.latin}`);
  conn.reply(m.chat, `${pickRandom(srh)}`);
} catch (e) {
  throw eror
  }
}
  
handler.help = ['surah']
handler.tags = ['islam']
handler.command = /^(surah)$/i
handler.group = false;
handler.limit = true; 
    
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
