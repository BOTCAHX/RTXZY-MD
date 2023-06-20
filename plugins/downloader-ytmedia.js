var { youtubeSearch} = require('@bochilteam/scraper');
var handler = async (m, { 
conn,
text, 
usedPrefix
}) => {
  if (!text) throw 'Enter Title'
  try {
    var vid = (await youtubeSearch(text)).video[0]
    if (!vid) throw 'Video/Audio Tidak Ditemukan'
    var { title, 
          description, 
          thumbnail, 
          videoId, 
          durationH, 
          durationS,
          viewH,
          publishedTime
                         } = vid
    var url = 'https://www.youtube.com/watch?v=' + videoId
    var vide = `https://yt.btch.bz/download?URL=${url}&videoName=video`
    let web = `https://yt.btch.bz/downloadAudio?URL=${url}&videoName=video`
    var tmb = thumbnail
    var captionvid = `  ∘ Title: ${title}
  ∘ Published: ${publishedTime}
  ∘ Duration: ${durationH}
  ∘ Second: ${durationS}
  ∘ Views: ${viewH}  
  ∘ Url:  ${url}
  ∘ Description: ${description}`
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
                        sourceUrl: web
                    }
                }, mentions: [m.sender]
}}, {})
    if (durationS > 18000) return conn.sendMessage(m.chat, { text: `*Link Original:* ${await cut(url)}\n\n_Durasi terlalu panjang..._\n*Duration Limit!*` }, { quoted: m })
    conn.sendMessage(m.chat, { audio: { url: web }, mimetype: 'audio/mpeg', contextInfo: {
    externalAdReply: {
    title: title,
    body: "",
    thumbnailUrl: tmb,
    sourceUrl: web,
    mediaType: 1,
    showAdAttribution: true,
    renderLargerThumbnail: true
    }}} , { quoted: m })
    conn.sendMessage(m.chat, { video: { url: vide }, mimetype: 'video/mp4' }, { quoted: m })
  } catch (e) {
    throw 'Video/Audio Tidak Ditemukan'
  }
}
handler.command = handler.help = ['ytmedia','youtubemedia'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;
async function cut(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://api.botcahx.live/api/linkshort/bitly?link=${url}&apikey=${btc}`)
  if (!res.ok) throw false
  return await res.text()
}
