const youtube = require("yt-search");
const btch = require("btch-downloader");

let handler = async (m, {
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
            var video
            try {
                video = await btch.youtube(convert.url)
            } catch (e) {
                conn.reply(m.chat, wait, m)
                video = await btch.youtube(convert.url)
            } 
            try {
                audio = `https://aemt.me/downloadAudio?URL=${convert.url}&videoName=ytdl`
             } catch (e) {
                conn.reply(m.chat, wait, m)
                audio = `https://yt.tioo.eu.org/youtube?url=${convert.url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
            }    
            if (command == 'mp3') {
                return conn.sendMessage(m.chat, {
                    audio: {
                        url: audio
                    },
                    mimetype: 'audio/mpeg',
                    contextInfo: {
                        externalAdReply: {
                            title: convert.title,
                            body: "",
                            thumbnailUrl: convert.thumbnail,
                            sourceUrl: audio,
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
                        url: video.link
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
