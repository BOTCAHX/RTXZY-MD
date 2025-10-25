let fetch = require('node-fetch');
let uploader = require('../lib/uploadImage');


let handler = m => m;

handler.before = async function(m, { conn }) {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || '';
    
    if (!global.antiporn) return;
    if (!/image/.test(mime)) return;
    
    try {
        let media = await q.download();
        let url = await uploader(media);
        
        const response = await fetch(`https://api.botcahx.eu.org/api/tools/nsfw-detect?url=${url}&apikey=${btc}`);
        const res = await response.json();
        
        if (res.result.labelName === 'Porn') {
            await conn.sendMessage(m.chat, {
                delete: {
                    remoteJid: m.chat,
                    fromMe: false,
                    id: m.key.id,
                    participant: m.key.participant
                }
            });
            this.reply(m.chat, '⚠️antiporn detected⚠️', null);
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = handler;
