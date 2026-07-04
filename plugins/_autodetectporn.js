let fetch = require('node-fetch');
let uploader = require('../lib/uploadImage');

let handler = m => m;

handler.before = async function(m, { conn }) {
    if (!global.db.data.chats[m.chat]?.antiporn) return;
    let target = m;
    let mime = (m.msg || m).mimetype || '';

    if (!/image|gif/.test(mime) && m.quoted) {
        let qmime = (m.quoted.msg || m.quoted).mimetype || '';
        if (/image|gif/.test(qmime)) {
            target = m.quoted;
            mime = qmime;
        }
    }

    if (!/image|gif/.test(mime)) return;

    try {
        let media = await target.download();
        let url = await uploader(media);

        const response = await fetch(`https://api.botcahx.eu.org/api/tools/nsfw-detect?url=${url}&apikey=${btc}`);
        const res = await response.json();

        if (res.result.labelName === 'Porn') {
            if (target === m.quoted) {
                await conn.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.msg.contextInfo.stanzaId,
                        participant: m.msg.contextInfo.participant
                    }
                });
                await conn.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            } else {
                await conn.sendMessage(m.chat, {
                    delete: {
                        remoteJid: m.chat,
                        fromMe: false,
                        id: m.key.id,
                        participant: m.key.participant
                    }
                });
            }
            this.reply(m.chat, '⚠️antiporn detected⚠️', null);
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = handler;
