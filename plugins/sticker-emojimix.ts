import * as zapo from '../lib/simple.ts';

import fetch from 'node-fetch'
import fs from 'fs'

import { sticker5 } from '../lib/sticker.ts'

let handler: WaPlugin = async (m, { conn, text, args }) => {
  const { MessageType } = zapo
  
  if (!args[0]) throw 'Contoh penggunaan:\n\n*.emojimix 🤨+😣*'
  try {
    let [emoji1, emoji2] = text.split('+')
    let anu = await fetch(`https://api.botcahx.eu.org/api/emoji/emojimix?emoji1=${emoji1}&emoji2=${emoji2}&apikey=${btc}`)
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
export default handler
