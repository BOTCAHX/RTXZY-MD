const crypto = require("crypto");
const { diffusion } = require("@xct007/frieren-scraper");
const { writeFileSync } = require("fs");
const mime = require('mime-types');
const path = require('path');
let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `Masukkan teks untuk diubah menjadi gambar\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
  if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
   const prompt = text.split(',').join(', ');
   const seed = crypto.randomBytes(9).toString('hex');

diffusion.stable(prompt, seed).then((Obj) => {
    console.log(Obj);
    const saveFilename = `./tmp.${Obj.ext}`;
    const buffer = Buffer.from(Obj.base64Img, "base64");
     writeFileSync(saveFilename, buffer);
    conn.sendFile(m.chat, saveFilename, null, `*Result For:* _${prompt}_`, m);
  });
};
handler.command = handler.help = ['diffusion','stablediffusion','dif'];
handler.tags = ['tools'];
handler.limit = true;
handler.private = false;
handler.group = false;

module.exports = handler;
