let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Masukan url/link nya mana?\n> .cuttly https://googe.com'
  let res = await fetch(`https://api.botcahx.live/api/linkshort/cuttly?link=${text}&apikey=${btc}`)
  let json = await res.json()
  if (json.status) m.reply(json.result)
  else throw 'Link Invalid!\nPeriksa url anda'
}
handler.help = ['cuttly'].map(v => v + ' <link>')
handler.tags = ['shortlink']
handler.command = /^cuttly2$/i

module.exports = handler
