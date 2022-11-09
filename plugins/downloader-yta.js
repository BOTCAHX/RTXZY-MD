let fetch = require ('node-fetch')
let { youtubeSearch } = require ('@bochilteam/scraper')
let handler = async (m, { conn, text }) => {
  if (!text) throw 'Url nya mana?'
  m.reply('_Proses..._')
  let vid = (await youtubeSearch(text)).video[0]
  let { videoId } = vid
  let url = 'https://www.youtube.com/watch?v=' + videoId
let ytLink = `https://botcahx2.ddns.net/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
  conn.sendMessage(m.chat, { audio: { url: ytLink }, mimetype: 'audio/mpeg' }, { quoted: m })
}
handler.help = ['ytv'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(yta|ytaudio|ytmp3)$/i

module.exports = handler
