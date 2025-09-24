const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

let handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^image/.test(mime) && !/webp/.test(mime)) {
        await conn.reply(m.chat, wait, m);
        try {
            const img = await q.download();
            const out = await uploadImage(img);
            const api = await fetch(`https://api.botcahx.eu.org/api/tools/remini?url=${out}&apikey=${btc}`);
            const image = await api.json();
            const { url } = image;
            conn.sendFile(m.chat, url, null, wm, m);
        } catch (e) {
            console.error(e);
            m.reply(`Identifikasi gagal. Silakan coba lagi.`);
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
};

handler.help = ['remini'];
handler.tags = ['tools'];
handler.command = ['remini'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
