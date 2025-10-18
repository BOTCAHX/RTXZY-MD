let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} pohon`
    m.reply(wait)
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/search/kbbi?text=${encodeURIComponent(text)}&apikey=${btc}`)).json();
        let content = `*K A M U S  B E S A R  B A H A S A  I N D O N E S I A*\n\n`;

        if (res.status && res.result) {
            content += `  ◦ *Kata:* ${res.result.lema}\n\n`;

            for (let [key, value] of Object.entries(res.result)) {
                if (key !== 'lema' && Array.isArray(value) && value.length > 0) {
                    content += `*${key.charAt(0).toUpperCase() + key.slice(1)}:*\n`;
                    for (let i of value) content += `  • ${i}\n`;
                    content += `\n`;
                }
            }
        } else {
            content += 'Kata tidak ditemukan di KBBI.';
        }

        await m.reply(content);
    } catch (error) {
        throw eror;
    }
};

handler.command = handler.help = ['kbbi', 'carikata', 'kamus'];
handler.tags = ['tools'];
handler.limit = true;
module.exports = handler;
