const fetch = require("node-fetch");
const { writeFileSync } = require("fs");
const path = require('path');
let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `Masukkan teks untuk diubah menjadi gambar\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
  if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;  
  const prompt = text.split(',').join(', ');
  const response = await fetch(`https://api.botcahx.live/api/search/stablediffusion?text=${text}&apikey=${btc}`);
  const buffer = await response.buffer();
  const saveFilename = path.join(__dirname, '../tmp/stablediffusion.png');
  writeFileSync(saveFilename, buffer);
  conn.sendFile(m.chat, saveFilename, null, `*Result For:* _${prompt}_`, m);
};
handler.command = handler.help = ['diffusion', 'stablediffusion', 'diff'];
handler.tags = ['tools'];
handler.limit = true;
handler.private = false;
handler.group = false;

module.exports = handler;
