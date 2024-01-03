const fetch = require('node-fetch');

let handler = async (m, { conn, args }) => {
   let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input teks atau reply teks yang ingin di jadikan carbon!"
   if (!text) return m.reply('masukan text') 
   try {
   m.reply(wait)
   let img = await fetch(`https://api.botcahx.eu.org/api/maker/carbon?text=${text}&apikey=${btc}`).then(res => res.json());
   await conn.sendFile(m.chat, img.result, 'img.jpeg', '', m)
   } catch (e) {
   throw `${eror}`
   }
}

handler.help = ['carbon']
handler.tags = ['maker']
handler.command = /^(carbon|carbonara)$/i
handler.limit = true
module.exports = handler
