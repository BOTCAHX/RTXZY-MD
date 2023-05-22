var { youtubeSearch } = require('@bochilteam/scraper');
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

   let vide = `https://yt.btch.bz/download?URL=${url}&videoName=video`

    let web = `https://yt.btch.bz/downloadAudio?URL=${url}&videoName=video`
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
    sourceUrl: web,
    mediaType: 1,
    showAdAttribution: true,
    renderLargerThumbnail: true
    }}})

    if (durationS > 18000) return conn.sendMessage(m.chat, { text: `*Link Original:* ${await cut(url)}\n\n_Durasi terlalu panjang..._\n*Duration Limit!*` }, { quoted: pesan })
    conn.sendMessage(m.chat, { audio: { url: web }, mimetype: 'audio/mpeg', contextInfo: {
    externalAdReply: {
    title: title,
    body: "",
    thumbnailUrl: tmb,
    sourceUrl: web,
    mediaType: 1,
    showAdAttribution: true,
    renderLargerThumbnail: true
    }}} , { quoted: pesan })
    await delay(10000);
    conn.sendMessage(m.chat, { video: { url: vide }, mimetype: 'video/mp4' }, { quoted: pesan })
  } catch (e) {
    throw 'Video/Audio Tidak Ditemukan'
  }
}
handler.command = handler.help = ['ytall'];
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
async function delay(ms) {
   await new Promise(resolve => setTimeout(resolve, ms));
}
