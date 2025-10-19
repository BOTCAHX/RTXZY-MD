const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Example:* ${usedPrefix}${command} https://www.google.com`;

    await m.reply('⏳ Mohon tunggu, sedang membuat ZIP dari website...');

    try {
        const response = await fetch(`https://api.botcahx.eu.org/api/tools/web2zip?url=${args[0]}&apikey=${global.btc}`);
        const json = await response.json();

        if (!json.status || !json.result) throw '❌ Gagal membuat ZIP dari website!';

        let zipUrl = json.result;

        let caption = `
🌐 Website: ${args[0]}
🗂 ZIP URL: ${zipUrl}
`.trim();

        await m.reply(caption);
        await conn.sendMessage(m.chat, {
            document: { url: zipUrl },
            mimetype: 'application/zip',
            fileName: `web2zip_${Date.now()}.zip`
        }, { quoted: m });

    } catch (e) {
        console.error(e);
        throw eror
    }
};

handler.help = ['web2zip <url>'];
handler.tags = ['downloader'];
handler.command = /^(web2zip|w2z)$/i;
handler.limit = true;

module.exports = handler;