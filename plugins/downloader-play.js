

let { youtubeSearch } = require ('@bochilteam/scraper')
let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Input Query'
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { title, description, thumbnail, videoId, durationH, durationS, viewH, publishedTime } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let web = `https://ytdl.tiodevhost.my.id/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
  let captionvid = `⭔ Title: ${title}\n⭔ Published: ${publishedTime}\n⭔ Duration: ${durationH}\n⭔ Views: ${viewH}\n⭔ Description: ${description}\n⭔ Url:  ${url}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId: `${usedPrefix}ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: captionvid, footer: '_Audio on progress..._', buttons }, { quoted: m })
 if (durationS > 18000) return conn.sendMessage(m.chat, { text: `*Link Original:* ${await cut(url)}\n\n_Durasi terlalu panjang_` }, { quoted: msg })
  conn.sendMessage(m.chat, { audio: { url: web }, mimetype: 'audio/mpeg' }, { quoted: msg })
}
handler.command = handler.help = ['play', 'song', 'lagu']
handler.tags = ['downloader']
handler.exp = 0
handler.limit = true
handler.premium = false
module.exports = handler
async function cut(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://api.tiodevhost.my.id/api/linkshort/cuttly?link=${url}`)
  if (!res.ok) throw false
  return await res.text()
}
