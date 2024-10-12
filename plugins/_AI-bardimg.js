const fetch = require('node-fetch');
const uploader = require('../lib/uploadImage');

let handler = async (m, { conn, text, command, usedPrefix }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || '' 
  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    let buffer = await q.download()
    await m.reply(wait)    
    try {
      let media = await uploader(buffer)
      let json = await (await fetch(`https://api.botcahx.eu.org/api/search/bard-img?url=${media}&text=${text}&apikey=${btc}`)).json()  
      conn.sendMessage(m.chat, { text: json.result }, { quoted: m })
    } catch (err) {
      throw `${eror}`
    }
  } else {
    throw `Reply image with command ${usedPrefix + command} pertanyaan`
  }
}

handler.help = ['bardimg','geminiimg']
handler.tags = ['tools']
handler.command = /^(bardimg|bardimage|geminiimg)$/i
handler.limit = true;

module.exports = handler
