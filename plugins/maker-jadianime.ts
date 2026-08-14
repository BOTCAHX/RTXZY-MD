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
            
            let res = await fetch(`https://api.botcahx.eu.org/api/maker/jadianime?url=${out}&apikey=${btc}`);
            let convert = await res.json();

            if (!convert.result || !convert.result.img_1 || !convert.result.img_2) {
                return m.reply("[ ! ] Gagal mendapatkan hasil.");
            }

            let img1 = await fetch(convert.result.img_1).then(res => res.buffer());
            let img2 = await fetch(convert.result.img_2).then(res => res.buffer());

            await conn.sendMessage(m.chat, { 
                image: img1, 
                caption: `🍟 *Fetching:* ${((Date.now() - old) * 1)} ms\n*Style:* Anime 2D` 
            }, { quoted: m });

            await conn.sendMessage(m.chat, { 
                image: img2, 
                caption: `🍟 *Fetching:* ${((Date.now() - old) * 1)} ms\n*Style:* Anime 3D` 
            }, { quoted: m });

        } catch (e) {
            console.error(e);
            m.reply("[ ! ] Terjadi kesalahan saat memproses gambar.");
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
};

handler.help = ['jadianime'];
handler.command = ['toanime', 'jadianime'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = true;

export default handler;
