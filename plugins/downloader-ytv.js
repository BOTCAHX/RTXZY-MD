let fetch = require ('node-fetch')
let { youtubeSearch } = require ('@bochilteam/scraper')
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Url nya mana?'
  m.reply('_Proses..._')
  let vid = (await youtubeSearch(text)).video[0]
  let { videoId } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
let ytLink = `https://ytdl.tiodevhost.my.id/?url=${url}&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`
  conn.sendMessage(m.chat, { video: { url: ytLink }, mimetype: 'video/mp4' }, { quoted: m })
}
handler.help = ['ytv'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ytv|ytvideo|ytmp4)$/i

module.exports = handler
