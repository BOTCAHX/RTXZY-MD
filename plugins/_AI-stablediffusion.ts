const __dirname = import.meta.dirname;
import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import path from 'path';

let handler: WaPlugin = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `Masukkan teks untuk diubah menjadi gambar\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
  if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;  
  const prompt = text.split(',').join(', ');
  const response = await fetch(`https://api.botcahx.eu.org/api/search/stablediffusion?apikey=${btc}&text=${prompt}`);
  const buffer = await response.buffer();
  const saveFilename = path.join(__dirname, '../tmp/stablediffusion.jpg');
  writeFileSync(saveFilename, buffer);
  conn.sendFile(m.chat, saveFilename, null, `*Result For:* _${prompt}_`, m);
};
handler.command = handler.help = ['diffusion', 'stablediffusion', 'diff'];
handler.tags = ['ai'];
handler.limit = true;
handler.private = false;
handler.group = false;

export default handler;
