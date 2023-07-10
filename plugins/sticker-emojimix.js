const fetch = require('node-fetch')
let fs = require("fs")
const { MessageType } = require('@adiwajshing/baileys')
const { sticker5 } = require('../lib/sticker')

let handler = async (m, { conn, text, args }) => {
  if (!args[0]) throw 'Contoh penggunaan:\n\n*.emojimix 🤨+😣*'
  try {
    let [emoji1, emoji2] = text.split`+`
    let anu = await fetch(`https://api.botcahx.live/api/emoji/emojimix?emoji1=${emoji1}&emoji2=${emoji2}&apikey=${btc}`)
    let res = await anu.json()
    let stiker = await sticker5(res.result.results[0].media_formats.png_transparent.url, false, packname, author)
    await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m)
  } catch (e) {
    m.reply('*🚩 Emoji tidak support!*');
  }
}

handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = /^(emojimix)$/i
handler.limit = true
module.exports = handler
