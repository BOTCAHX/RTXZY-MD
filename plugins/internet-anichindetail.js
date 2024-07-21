let fetch = require('node-fetch');

let handler = async (m, { text, conn, usedPrefix, command }) => {
    if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} https://anichin.site/throne-of-seal/`;

    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/webzone/anichin-detail?url=${text}&apikey=${btc}`);
        let json = await api.json();
        let res = json.result;

        let teks = '';
        let episodeNumber = 1;

        for (let item of res) {
            teks += `\n\n ◦  *Episode ${episodeNumber}:* ${item.episodeRange}\n`;
            for (let download of item.downloadLinks) {
                teks += `\n  *Resolution:* ${download.resolution}\n`;
                for (let link of download.links) {
                    teks += `  ◦  ${link.text}: ${link.href}\n`;
                }
            }
            episodeNumber++;
        }
        await m.reply(teks);

    } catch (e) {
        throw eror;
    }
};

handler.command = handler.help = ['anichindetail'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true;

module.exports = handler;
