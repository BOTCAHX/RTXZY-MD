var { youtubeSearch } = require('@bochilteam/scraper');
var handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Enter Title / link'
  try {
    var vid = (await youtubeSearch(text)).video[0]
    if (!vid) throw 'Video/Audio Tidak Ditemukan'
    var { title, description, thumbnail, videoId, durationH, durationS, viewH, publishedTime } = vid
    var url = 'https://www.youtube.com/watch?v=' + videoId

    let vide = `https://yt.btch.bz/download?URL=${url}&videoName=video`
    var tmb = thumbnail
    var captionvid = `  ∘ Title: ${title}
  ∘ Published: ${publishedTime}
  ∘ Duration: ${durationH}
  ∘ Second: ${durationS}
  ∘ Views: ${viewH}  
  ∘ Url:  ${url}
  ∘ Description: ${description}`
    var pesan = await conn.sendMessage(m.chat, {
      text: captionvid,
      contextInfo: {
        externalAdReply: {
          title: "",
          body: "Powered by",
          thumbnailUrl: tmb ,
          sourceUrl: vide,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    })
    if (durationS > 18000) return conn.sendMessage(m.chat, { text: `*Link Original:* ${await cut(url)}\n\n_Durasi terlalu panjang..._\n*Duration Limit!*` }, { quoted: pesan })

    conn.sendMessage(m.chat, {
      video: {
        url: vide,
        mimetype: 'video/webm',
        attributes: [
          {
            name: 'controls',
            value: 'true'
          },
          {
            name: 'autoplay',
            value: 'true'
          }
        ]
      }
    }, { quoted: pesan })
  } catch (e) {
    throw 'Video/Audio Tidak Ditemukan'
  }
}

handler.command = handler.help = ['ytmp4', 'ytv']
handler.tags = ['downloader']
handler.exp = 0
handler.limit = true
handler.premium = false
module.exports = handler
