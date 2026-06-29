let fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
   if (!args[0]) throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/reel/DKPtUL_S9Nh/?igsh=MTE1dTVkb2E4NTFmcw==`
   
   if (!args[0].match(/instagram/gi)) {
       throw `URL Instagram Tidak Valid!`
   }
   await m.reply(wait)
   try {
       const api = await fetch(`https://api.botcahx.eu.org/api/dowloader/igdowloader?url=${args[0]}&apikey=${btc}`)
       const res = await api.json()
       
       const limitnya = 3
       
       for (let i = 0; i < Math.min(limitnya, res.result.length); i++) {
           await sleep(3000)
           conn.sendFile(m.chat, res.result[i].url, null, `*Instagram Downloader*`, m)
       }
   } catch (e) {
       throw eror
   }
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instagramdl|igstory)$/i
handler.limit = true

module.exports = handler

function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
