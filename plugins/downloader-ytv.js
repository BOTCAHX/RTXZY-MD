const { youtube } = require("btch-downloader");
let handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw 'Link From YouTube!';
    try {
        var convert = await youtube(text);
        if (!convert) throw 'Video/Audio Tidak Ditemukan';
            let api = await fetch(`https://api.botcahx.live/api/dowloader/yt?url=${text}&apikey=${btc}`);
            let json = await api.json();
            var caption = `∘ Title : ${convert.title}\n∘ Size : ${convert.size}\n∘ Quality : ${convert.quality}`;
            var pesan = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: caption, 
                contextInfo: {
                     externalAdReply: {
                        title: "Powered by ",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: convert.thumb,
                        sourceUrl: text
                    }
                }, mentions: [m.sender]
                }}, {})
                conn.sendMessage(m.chat, { video: { url: json.result.mp4.result }, mimetype: 'video/mp4' }, { quoted: m })
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
