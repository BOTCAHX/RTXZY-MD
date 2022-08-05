let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'Masukan url/link nya mana?\n> .cuttly https://botcahx-rest-api.herokuapp.com'
  let res = await fetch(`https://botcahx-rest-api.herokuapp.com/api/linkshort/cuttly?link=${text}`)
  let json = await res.json()
  if (json.status) m.reply(json.result)
  else throw 'Link Invalid!\nPeriksa url anda'
}
handler.help = ['cuttly'].map(v => v + ' <link>')
handler.tags = ['shortlink']
handler.command = /^cuttly$/i

module.exports = handler
