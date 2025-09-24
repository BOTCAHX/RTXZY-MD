const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage.js');

let handler = async (m, { conn, usedPrefix, command }) => {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/^video/.test(mime)) {
        await conn.reply(m.chat, wait, m); // Added wait message
        try {
            const img = await q.download();
            const out = await uploadImage(img); // Assuming uploadImage is correct
            const api = await fetch(`https://api.botcahx.eu.org/api/tools/hdvideo?url=${out}&apikey=${btc}`);
            const video = await api.json();
            const { url } = video;
            conn.sendFile(m.chat, url, null, wm, m);
        } catch (e) {
            console.error(e);
            m.reply(`Identifikasi gagal. Silakan coba lagi.`);
        }
    } else {
        m.reply(`Kirim Video dengan caption *${usedPrefix + command}* atau tag Video yang sudah dikirim.`);
    }
};

handler.help = ['hdvideo', 'hdvid'];
handler.tags = ['tools'];
handler.command = ['hdvideo', 'hdvid'];
handler.premium = false;
handler.limit = true;

module.exports = handler;
