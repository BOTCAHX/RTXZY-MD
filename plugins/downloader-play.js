var { youtubeSearch } = require('@bochilteam/scraper');
var fetch = require('node-fetch')
var handler = async (m, {
    conn,
    text,
    usedPrefix
}) => {
    if (!text) throw 'Enter Title / Link From YouTube!'
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
            m.reply('Video is longer than 1 hour!')
        } else {
            var url = 'https://www.youtube.com/watch?v=' + videoId
            var cvr
            try {
                cvr = await fetch(`https://yt.nxr.my.id/yt2?url=${url}&type=audio`)
            } catch (e) {
                conn.reply(m.chat, wait, m)
                cvr = await fetch(`https://yt.nxr.my.id/yt2?url=${url}&type=audio`)
            }
            var sce = await cvr.json()
            var mcs = sce.data.url
            var tmb = thumbnail
            var captionvid = `∘ Title: ${title}\n∘ Published: ${publishedTime}\n∘ Duration: ${durationH}\n∘ Second: ${durationS}\n∘ Views: ${viewH}\n∘ Url:  ${url}\n∘ Description: ${description}`
            var pesan = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: captionvid, 
                contextInfo: {
                     externalAdReply: {
                        title: "Powered by",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: tmb,
                        sourceUrl: mcs
                    }
                }, mentions: [m.sender]
}}, {})
 conn.sendMessage(m.chat, {
                audio: {
                    url: mcs
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
                quoted: m
            })
        }
    } catch (e) { 
       conn.reply(m.chat, `*Error:* ` + eror, m)
    }
}
handler.command = handler.help = ['play', 'song', 'ds', 'ytmp3','yta'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;
