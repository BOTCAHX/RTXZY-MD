let search = require('yt-search');
let fetch = require('node-fetch');
 
let handler = async (m, { conn, text, usedPrefix }) => {
    if (!text) throw 'Enter Title / Link From YouTube!';
    try {
        await m.reply(wait)
        const look = await search(text);
        const convert = look.videos[0];
        if (!convert) throw 'Video/Audio Tidak Ditemukan';
        if (convert.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
        } else {
            let audioUrl;
            try {
                const res = await fetch(`https://api.botcahx.eu.org/api/dowloader/yt?url=${convert.url}&apikey=${btc}`);
                try {
                    audioUrl = await res.json();
                } catch (e) {
                    conn.reply(m.chat, eror, m)
                }
                
            } catch (e) {
                conn.reply(m.chat, eror, m)
                return;
            }
 
            let caption = '';
            caption += `∘ Title : ${convert.title}\n`;
            caption += `∘ Ext : Search\n`;
            caption += `∘ ID : ${convert.videoId}\n`;
            caption += `∘ Duration : ${convert.timestamp}\n`;
            caption += `∘ Viewers : ${convert.views}\n`;
            caption += `∘ Upload At : ${convert.ago}\n`;
            caption += `∘ Author : ${convert.author.name}\n`;
            caption += `∘ Channel : ${convert.author.url}\n`;
            caption += `∘ Url : ${convert.url}\n`;
            caption += `∘ Description : ${convert.description}\n`;
            caption += `∘ Thumbnail : ${convert.image}`;
 
            await conn.sendMessage(m.chat, { image: { url: convert.image }, caption: caption, mentions: [m.sender] }, { quoted: m });
 
            await conn.sendMessage(m.chat, {
                audio: {
                    url: audioUrl.result.mp3
                },
                mimetype: 'audio/mpeg',
            }, {
                quoted: m
            });
        }
    } catch (e) {
        conn.reply(m.chat, eror, m)
    }
};
 
handler.command = handler.help = ['play', 'song', 'ds'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
 
module.exports = handler;
