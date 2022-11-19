let fetch = require ('node-fetch')
let { youtubeSearch } = require ('@bochilteam/scraper')

let handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Input Query'
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Video/Audio Tidak Ditemukan'
  let { title, description, thumbnail, videoId, durationH, durationS, viewH, publishedTime } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
  let ytLink = `https://botcahx2.ddns.net/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
  let capt = `⭔ Title: ${title}\n\n⭔ Published: ${publishedTime}\n⭔ Duration: ${durationH}\n⭔ Views: ${viewH}\n⭔ Description: ${description}\n⭔ Url:  ${url}`
  let buttons = [{ buttonText: { displayText: 'Video' }, buttonId: `${usedPrefix}ytv ${url}` }]
  let msg = await conn.sendMessage(m.chat, { image: { url: thumbnail }, caption: capt, footer: '_Audio on progress..._', buttons }, { quoted: m })
 if (durationS > 4000) return conn.sendMessage(m.chat, { text: `*Download:* ${await shortUrl(ytLink)}\n\n_Durasi terlalu panjang download manual saja lewat link berikut..._` }, { quoted: msg })
  conn.sendMessage(m.chat, { audio: { url: ytLink }, mimetype: 'audio/mpeg' }, { quoted: msg })
}
handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play|song)$/i
handler.exp = 0

module.exports = handler

async function shortUrl(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://botcahx.ddns.net/api/linkshort/cuttly?link=${url}`)
  if (!res.ok) throw false
  return await res.text()
}
