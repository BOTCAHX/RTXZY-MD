import fetch from 'node-fetch';
import uploader from '../lib/uploadImage.ts';

let handler: WaPlugin = async (m, { conn, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || '' 
   if (/image/g.test(mime) && !/webp/g.test(mime)) {
    let buffer = await q.download()
    await m.reply(wait)    
    try {
      let media = await uploader(buffer)
      let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/nsfw-detect?url=${media}&apikey=${btc}`)).json()
      if (res.status) {
        let { labelName, labelId, confidence } = res.result;
        let capt;
            capt = `乂 *N S F W D E T E C T O R*\n\n`;
            capt += `◦ *Label Name* : ${labelName}\n`;
            capt += `◦ *Label Id* : ${labelId}\n`;
            capt += `◦ *Confidence* : ${confidence}\n`;
            m.reply(capt);
      }
      
    } catch (err) {
      throw eror
    }
  } else {
    throw `Reply image with command ${usedPrefix + command}`
  }
}

handler.help = ['nsfwdetector','nsfwdetect']
handler.tags = ['tools']
handler.command = /^(nsfwdetector|nsfwdetect)$/i
handler.limit = true;
handler.group = true;

export default handler
