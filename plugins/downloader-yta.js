var {
    youtubeSearch,
    youtubedl,
    youtubedlv2,
    youtubedlv3
} = require('@bochilteam/scraper');
var hxz = require('hxz-api');
var handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw 'Enter Title'
    try {
        var vid = (await youtubeSearch(text)).video[0]
        if (!vid) throw 'Video/Audio Tidak Ditemukan'
        var {
            title,
            description,
            thumbnail,
            videoId,
            durationH,
            durationS,
            viewH,
            publishedTime
        } = vid
        if (durationS >= 3600) { 
            m.reply('Video durasinya lebih dari 1 jam')
        } else {
            var url = 'https://www.youtube.com/watch?v=' + videoId
            var cvr = await hxz.youtube(url)
            var sce = cvr.mp3
            var tmb = thumbnail
            var captionvid = `  ∘ Title: ${title}\n∘ Published: ${publishedTime}\n∘ Duration: ${durationH}\n∘ Second: ${durationS}\n∘ Views: ${viewH}\n∘ Url:  ${url}\n∘ Description: ${description}`
            var pesan = await conn.sendMessage(m.chat, {
                text: captionvid,
                contextInfo: {
                    externalAdReply: {
                        title: "",
                        body: "Powered by",
                        thumbnailUrl: tmb,
                        sourceUrl: url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            })
            conn.sendMessage(m.chat, {
                audio: {
                    url: sce
                },
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "",
                        thumbnailUrl: tmb,
                        sourceUrl: url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: pesan
            })
        }
    } catch (e) {
        m.reply('Error: ' + 'Internal server down')
    }
}
handler.command = handler.help = ['yta', 'ytmp3'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;