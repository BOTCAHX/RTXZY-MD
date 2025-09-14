const fetch = require('node-fetch');

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `*Example: ${usedPrefix + command} halo*`; 
  await m.reply(wait);
  try {
    const res = await fetch(`https://api.botcahx.eu.org/api/maker/iqc?text=${encodeURIComponent(text)}&apikey=${btc}`);
    const data = await res.json();
    const img_rs = await fetch(data.result);
    const buffer = await img_rs.buffer();
    await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
  } catch (error) {
    throw eror
  }
};

handler.help = ['iqc <text>'];
handler.tags = ['tools'];
handler.command = ['iqc'];
handler.limit = true;

module.exports = handler;
