const youtube = require("yt-search");
let handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw 'Enter Title / Link From YouTube!';
    try {
        var search = await youtube(text);
        var convert = search.videos[0];
        if (!convert) throw 'Video/Audio Tidak Ditemukan';
        if (convert.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
        } else {
            var videoUrl
            try {
                videoUrl = `https://yt.tioo.eu.org/?url=${convert.url}&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`
            } catch (e) {
                conn.reply(m.chat, wait, m)
                videoUrl = `https://yt.tioo.eu.org/?url=${convert.url}&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`
            }             
            var caption = `∘ Title : ${convert.title}\n∘ Ext : Search\n∘ ID : ${convert.videoId}\n∘ Duration : ${convert.timestamp}\n∘ Viewers : ${convert.views}\n∘ Upload At : ${convert.ago}\n∘ Author : ${convert.author.name}\n∘ Channel : ${convert.author.url}\n∘ Url : ${convert.url}\n∘ Description : ${convert.description}\n∘ Thumbnail : ${convert.image}`;
            var pesan = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: caption, 
                contextInfo: {
                     externalAdReply: {
                        title: "Powered by ",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: convert.image,
                        sourceUrl: videoUrl
                    }
                }, mentions: [m.sender]
                }}, {})
                conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: 'video/mp4' }, { quoted: m })
        }
    } catch (e) {
        conn.reply(m.chat, `*Error:* ` + e, m);
    }
};

handler.command = handler.help = ['ytv','ytmp4'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;
