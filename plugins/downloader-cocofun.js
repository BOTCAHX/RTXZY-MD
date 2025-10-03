const fetch = require('node-fetch');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Gunakan contoh ${usedPrefix}${command} https://www.icocofun.com/share/post/379250110809?lang=id&pkg=id&share_to=copy_link`;
    try {
        await m.reply(wait);
        const res = await fetch(`https://api.botcahx.eu.org/api/download/cocofun?url=${encodeURIComponent(args[0])}&apikey=${btc}`);
        const json = await res.json();

        if (!json.status || !json.result) {
            throw `Gagal mendapatkan data video dari tautan yang diberikan`;
        }

        const videoUrl = json.result.no_watermark || json.result.watermark;
        if (!videoUrl) {
            throw `Tidak ditemukan URL video (dengan atau tanpa watermark)`;
        }

        const caption = `*Cocofun Downloader*\n\n` +
                        `Topik: ${json.result.topic || 'N/A'}\n` +
                        `Caption: ${json.result.caption || 'N/A'}\n` +
                        `Durasi: ${json.result.duration || 'N/A'} detik\n` +
                        `Jumlah Putar: ${json.result.play || 'N/A'}\n` +
                        `Like: ${json.result.like || 'N/A'}\n` +
                        `Share: ${json.result.share || 'N/A'}`;

        await conn.sendFile(m.chat, videoUrl, 'cocofun.mp4', caption, m);
    } catch (error) {
        console.error(error);
        throw 'Terjadi kesalahan saat memproses download video Cocofun';
    }
};

handler.help = ['cocofun'].map(v => v + ' <url>');
handler.command = /^(cocofun|cocofundl|dlcocofun)$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
