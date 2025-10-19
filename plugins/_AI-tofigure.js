const uploadImage = require('../lib/uploadImage');
const fetch = require('node-fetch');

let handler = async (m, { conn, usedPrefix, command }) => {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';
    
    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, "⏳ Sedang diproses...", m);
        try {
            const img = await q.download?.();
            let out = await uploadImage(img);
            let old = new Date();
            
            if (command == 'tofigure') {
                let apiUrl = `https://api.botcahx.eu.org/api/maker/tofigurev3?url=${out}&apikey=${btc}`;
                let res = await fetch(apiUrl);
                let convert = await res.buffer();
                await conn.sendMessage(m.chat, { 
                    image: convert, 
                    caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms`
                }, { quoted: m });
            }
            
            if (command == 'tofigure2') {
                let apiUrl = `https://api.botcahx.eu.org/api/maker/tofigurev2?url=${out}&apikey=${btc}`;
                let res = await fetch(apiUrl);
                let convert = await res.buffer();
                await conn.sendMessage(m.chat, { 
                    image: convert, 
                    caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms`
                }, { quoted: m });
            }
            
            if (command == 'tofigure3') {
                let apiUrl = `https://api.botcahx.eu.org/api/maker/tofigure?url=${out}&apikey=${btc}`;
                let res = await fetch(apiUrl);
                let convert = await res.buffer();
                await conn.sendMessage(m.chat, { 
                    image: convert, 
                    caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms`
                }, { quoted: m });
            }

        } catch (e) {
            console.error(e);
            m.reply("[ ! ] Terjadi kesalahan saat memproses gambar.");
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
};

handler.help = ['tofigure', 'tofigure2', 'tofigure3'];
handler.command = ['tofigure', 'tofigure2', 'tofigure3'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = true;

module.exports = handler;