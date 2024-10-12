const fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw(`Input Text Dan Karakter!\nExample: ${usedPrefix + command} Kirito|kamu sedang apa?`)    
  try {
    let [ logic, prompt ] = text.split('|')
    m.reply(`Tunggu sebentar...`)
    let res = await fetch(`https://api.botcahx.eu.org/api/search/c-ai?apikey=${btc}&char=${logic}&prompt=${prompt}`)
    let json = await res.json()
    m.reply(json.message)
  } catch (e) {
    throw eror
  }
}

handler.command = handler.help = ['c-ai','character-ai']
handler.tags = ['tools']
handler.owner = false
handler.limit = false
handler.group = false
handler.private = false

module.exports = handler
