let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Masukan url/link nya mana?\n> .bitly2 https://google.com'
  let res = await fetch(`https://api.botcahx.eu.org/api/linkshort/bitly?link=${text}&apikey=${btc}`)
  let json = await res.json()
  if (json.status) m.reply(json.result)
  else throw 'Link Invalid!\nPeriksa url anda'
}
handler.help = ['bitly'].map(v => v + ' <link>')
handler.tags = ['shortlink']
handler.command = /^bitly$/i

module.exports = handler
