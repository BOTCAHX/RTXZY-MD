var {
	youtubeSearch,
	youtubedl,
	youtubedlv2,
	youtubedlv3
                } = require('@bochilteam/scraper');
   var handler = async (m, { 
    conn,
    text, 
    usedPrefix
               }) => {
  if (!text) throw 'Enter Title'
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
  let web = `https://ytdl.tiodevhost.my.id/?url=${url}&filter=audioonly&quality=highestaudio&contenttype=audio/mpeg`
  var captionvid = `⭔ Title: ${title}\n⭔ Published: ${publishedTime}\n⭔ Duration: ${durationH}\n⭔ Views: ${viewH}\n⭔ Description: ${description}\n⭔ Url:  ${url}`
  var pesan = await conn.sendButtonImg(m.chat, thumbnail,  captionvid, '_Audio on progress..._', 'Video', '${usedPrefix}ytv ${url}', m, {  
      quoted: m})
 if (durationS > 18000) return conn.sendMessage(m.chat, { text: `*Link Original:* ${await cut(url)}\n\n_Durasi terlalu panjang_` }, { quoted: pesan })
  conn.sendMessage(m.chat, { audio: { url: web }, mimetype: 'audio/mpeg' }, { quoted: pesan })
}
handler.command = handler.help = ['play', 'song', 'lagu'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;
async function cut(url) {
  url = encodeURIComponent(url)
  let res = await fetch(`https://api.tiodevhost.my.id/api/linkshort/cuttly?link=${url}`)
  if (!res.ok) throw false
  return await res.text()
}
