const fetch = require('node-fetch');
const uploader = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/audio/.test(mime)) {
        let buffer = await q.download();
        await m.reply(wait);
        try {
            let media = await uploader(buffer);
            let fileSizeLimit = 10 * 1024 * 1024 
              if (media.length > fileSizeLimit) {
                throw 'Ukuran media tidak boleh melebihi 10MB'
              }
            let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/voiceremover?url=${media}&apikey=${btc}`)).json();
            if (command === 'vocalremover') {
                await conn.sendMessage(m.chat, { audio: { url: res.result.instrumental_path }, mimetype: 'audio/mpeg' }, { quoted: m });
            } else if (command === 'instrumenremover') {
                await conn.sendMessage(m.chat, { audio: { url: res.result.vocal_path }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
        } catch (err) {
            throw eror;
        }
    } else {
        throw `Reply *audio* with command ${usedPrefix + command}`;
    }
}

handler.command = handler.help = ['vocalremover', 'instrumenremover'];
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;
