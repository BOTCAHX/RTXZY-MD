const youtube = require("yt-search");
const btch = require("btch-downloader");

var handler = async (m, {
    conn,
    text,
    command
}) => {
    if (!text) throw 'Enter Title / Link From YouTube!';
    conn.reply(m.chat, wait, m)
    try {
        var search = await youtube(text);
        var convert = search.videos[0];
        if (!convert) throw 'Video/Audio Tidak Ditemukan';
        if (convert.seconds >= 3600) {
            return conn.reply(m.chat, 'Video is longer than 1 hour!', m);
        } else {
            var audioUrl
            try {
                audioUrl = await btch.youtube(convert.url)
            } catch (e) {
                conn.reply(m.chat, wait, m)
                audioUrl = await btch.youtube(convert.url)
            } 
            if (command == 'mp3') {
                return conn.sendMessage(m.chat, {
                    audio: {
                        url: audioUrl.mp3
                    },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        externalAdReply: {
                            title: convert.title,
                            body: "",
                            thumbnailUrl: audioUrl.thumb,
                            sourceUrl: convert.url,
                            mediaType: 1,
                            showAdAttribution: true,
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: m
                });
            }
            if (command == 'mp4') {
                return conn.sendMessage(m.chat, { 
                    video: { 
                        url: audioUrl.link
                    }, 
                    mimetype: 'video/mp4' 
                }, { 
                    quoted: m
                });
            }
        }
    } catch (e) {
        conn.reply(m.chat, `*Error:* ` + e, m);
    }
};

handler.command = handler.help = ['mp3','mp4'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;
