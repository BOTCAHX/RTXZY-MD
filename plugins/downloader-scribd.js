let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Contoh:*\n${usedPrefix + command} https://www.scribd.com/document/806367834/Pengembangan-Meta-AI`;

    if (!text.includes('scribd.com')) throw 'Link harus dari Scribd!';

    m.reply(wait);

    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/download/scribd?url=${encodeURIComponent(text)}&apikey=${btc}`)).json();

        if (!res.status || !res.result?.download) throw 'Gagal mengambil file.';

        let { title, sizeKB, download } = res.result;

        let fileBuffer = await (await fetch(download)).buffer();

        await conn.sendMessage(m.chat, {
            document: fileBuffer,
            mimetype: 'application/pdf',
            fileName: `${title.replace(/[^a-zA-Z0-9]/g, '_') || 'Scribd_Doc'}.pdf`,
            caption: `*Scribd Downloader*\n\nJudul: ${title}\nUkuran: ${sizeKB} KB`
        }, { quoted: m });

    } catch (e) {
        throw eror;
    }
};

handler.help = ['scribd'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(scribd|scribddl|dlscribd)$/i;
handler.limit = true;

module.exports = handler;
