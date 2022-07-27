let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'url/link nya mana?'
  let res = await fetch(global.API('xteam', '/shorturl/bitly', { url: text }, 'APIKEY'))
  let json = await res.json()
  if (json.status) m.reply(json.result.link)
  else throw 'Link Invalid!\nPeriksa url anda'
}
handler.help = ['bitly'].map(v => v + ' <link>')
handler.tags = ['shortlink']
handler.command = /^bitly$/i

module.exports = handler
