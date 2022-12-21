var {
	youtubeSearch,
	youtubedl,
	youtubedlv2,
	youtubedlv3
                } = require('@bochilteam/scraper');
  var handler = async (m, { 
                        conn,
                        text 
                        }) => {
  if (!text) throw 'Url nya mana?'
  m.reply('_Proses..._')
  var vid = (await youtubeSearch(text)).video[0]
  var { videoId } = vid
  var url = 'https://www.youtube.com/watch?v=' + videoId
var ytLink = `https://ytdl.tiodevhost.my.id/?url=${url}&filter=audioandvideo&quality=highestvideo&contenttype=video/mp4`
  conn.sendMessage(m.chat, { video: { url: ytLink }, mimetype: 'video/mp4' }, { quoted: m })
}
handler.command = handler.help = ['ytv', 'ytvideo', 'ytmp4'];
handler.tags = ['downloader'];
module.exports = handler;
