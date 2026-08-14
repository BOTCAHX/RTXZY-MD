import uploadImage from '../lib/uploadImage.ts';
import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, "⏳ Sedang diproses...", m);
        try {
            const img = await q.download?.();
            let out = await uploadImage(img);
            let old = Date.now();
            
            let img_url_api = await (await fetch(`https://api.botcahx.eu.org/api/maker/jadisdmtinggi?url=${out}&apikey=${btc}`)).buffer()
            await conn.sendMessage(m.chat, { 
                image: img_url_api, 
                caption: `🍟 *Fetching:* ${((Date.now() - old) * 1)} ms` 
            }, { quoted: m });
        } catch (e) {
            console.error(e);
            m.reply("[ ! ] Terjadi kesalahan saat memproses gambar.");
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
};

handler.help = ['tosdmtinggi', 'sdmtinggi', 'sdm'];
handler.command = ['tosdmtinggi', 'sdmtinggi', 'sdm'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = true;

export default handler;
