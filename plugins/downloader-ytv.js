const ytdl = require('ytdl-core');
const fetch = require('node-fetch');

let handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw 'Link From YouTube!';
    try {
        const { videoDetails } = await ytdl.getInfo(text);
        const { title, description, publishDate, author } = videoDetails;
        let api = await fetch(`https://api.botcahx.live/api/dowloader/yt?url=${text}&apikey=${btc}`).then(res => res.json());
        var caption = `∘ Title : ${title}\n∘ Author : ${author}\n∘ Publish : ${publishDate}\n∘ Description : ${description}`;
        conn.sendMessage(m.chat, { video: { url: api.result.mp4.result }, mimetype: 'video/mp4', caption: caption }, { quoted: m });
    } catch (e) {
        conn.reply(m.chat, `*Error:* ${e}`, m);
    }
};

handler.command = handler.help = ['ytv', 'ytmp4'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;

module.exports = handler;
