const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukkan URL!\n\nContoh:\n${usedPrefix + command} https://xhslink.com/o/2jqifpr7GJ5`;
    if (!text.match(/xhslink|xiaohongshu/gi)) throw `URL Tidak Valid!`;

    m.reply(wait);
    try {
        const res = await axios.get(`https://api.botcahx.eu.org/api/download/rednote?url=${text}&apikey=${btc}`);
        const result = res.data?.result;
        if (!result || !result.media) throw `Gagal mengambil data!`;

        const media = result.media;
        const meta = result.metadata;
        const title = meta?.title || "No title";

        if (media.videoUrl) {
            await conn.sendMessage(
                m.chat,
                {
                    video: { url: media.videoUrl },
                    caption: `*Title:* ${title}`,
                },
                { quoted: m }
            );
        } else if (media.images && media.images.length > 0) {
            for (let img of media.images) {
                await sleep(2000);
                await conn.sendMessage(
                    m.chat,
                    {
                        image: { url: img },
                        caption: `*Title:* ${title}`,
                    },
                    { quoted: m }
                );
            }
        } else {
            throw `Konten tidak ditemukan!`;
        }

    } catch (e) {
        console.error(e);
        throw `Terjadi kesalahan saat memproses permintaan!`;
    }
};

handler.help = ['xiaohongshu', 'rednote'];
handler.command = /^(xiaohongshu|xhs|xhsdl|rednote)$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.premium = false;

module.exports = handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
