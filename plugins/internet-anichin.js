let fetch = require('node-fetch');

let handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} throne of seal`;

    try {
        let teks = '*A N I C H I N   S E A R C H*';
        const api = await fetch(`https://api.botcahx.eu.org/api/webzone/anichin-search?query=${text}&apikey=${btc}`);
        let json = await api.json();
        let res = json.result;

        for (let i in res) {
            teks += `\n\n ◦  *Title:* ${res[i].title}\n`;
            teks += ` ◦  *Status:* ${res[i].status}\n`;
            teks += ` ◦  *Type:* ${res[i].type}\n`;
            teks += ` ◦  *Subtitle:* ${res[i].subtitle}\n`;
            teks += ` ◦  *URL:* ${res[i].link}\n`;
        }

        let thumb = res.length > 0 ? res[0].image : '';
        let sourceUrl = res.length > 0 ? res[0].link : '';

        await conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: teks,
                contextInfo: {
                    externalAdReply: {
                        title: 'A N I C H I N   S E A R C H',
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumb,
                        sourceUrl: sourceUrl
                    }
                },
                mentions: [m.sender]
            }
        }, {});

    } catch (e) {
        throw eror;
    }
};

handler.command = handler.help = ['anichin'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true;

module.exports = handler;
