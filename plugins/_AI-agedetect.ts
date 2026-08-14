import uploadImage from '../lib/uploadImage.ts';
import fetch from 'node-fetch';
let handler: WaPlugin = async (m, { 
  conn, 
  usedPrefix, 
  command 
}) => {
  var q = m.quoted ? m.quoted : m;
  var mime = (q.mimetype || q.mediaType || '');
  
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, wait, m);
    
    try {
      const img = await q.download?.();
      let out = await uploadImage(img);
      let old = Date.now();
      let res = await fetch(`https://api.botcahx.eu.org/api/search/agedetect?url=${out}&apikey=${btc}`);
      let convert = await res.json();   
      let txt = `*乂 A G E   D E T E C T I O N*\n\n`;
        txt += `◦ *Score:* ${convert.result.score} \n`;
        txt += `◦ *Age:* ${convert.result.age} \n`;
        txt += `◦ *Gender:* ${convert.result.gender} \n`;
        txt += `◦ *Expression:* ${convert.result.expression} \n`;
        txt += `◦ *Face Shape:* ${convert.result.faceShape} \n`;
        txt += `\n`
        await conn.sendFile(m.chat, out, 'age.png', txt, m)
    } catch (e) {
      console.log(e);
      m.reply(`[ ! ] Identifikasi Wajah Gagal.`);
    }
  } else {
    m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim`);
  }
};

handler.help = handler.command = ['age', 'agedetect', 'agedetector'];
handler.tags = ['ai'];
handler.premium = false;
handler.limit = true;

export default handler;
