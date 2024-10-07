let fetch = require('node-fetch');
let uploader = require('../lib/uploadFile');

let handler = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    if (/webp/.test(mime)) {
        let buffer = await q.download();
        await m.reply(wait);
        try {
            let media = await uploader(buffer);
            let json;
            if (command === 'togif') {        
                json = await (await fetch(`https://api.botcahx.eu.org/api/tools/webp2mp4?url=${media}&apikey=${btc}`)).json();
            } else if (command === 'toimg') {
                json = await (await fetch(`https://api.botcahx.eu.org/api/tools/webp2png?url=${media}&apikey=${btc}`)).json();
            }
            if (json && json.result) {
                await conn.sendFile(m.chat, json.result, null, "*DONE*", m);
            } else {
                await m.reply('Error: Failed to convert file. Please try again.');
            }
        } catch (err) {
            await m.reply('An error occurred while processing your request.');
        }
    } else {
        await m.reply(`Reply sticker with command ${usedPrefix + command}`);
    }
}

handler.help = ['toimg', 'togif'];
handler.tags = ['tools'];
handler.command = /^(toimg|togif)$/i;
handler.limit = true;

module.exports = handler;
