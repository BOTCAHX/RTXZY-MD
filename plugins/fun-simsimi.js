/*let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(global.API('https://api.simsimi.net', '/v2/', { text: encodeURIComponent(text), lc: "id" }, ''))
  let json = await res.json()
  if (json.success) m.reply(json.success)
  else throw json
}
handler.help = ['simi', 'simsimi', 'simih'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|simih)$/i

module.exports = handler*/

let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  let res = await fetch(`http://api.brainshop.ai/get?bid=175444&key=DxrtWTGGOUvgKqya&uid=175444&msg=${encodeURIComponent(text)}`)
  let json = await res.json()
  m.reply(json.cnt)
}
handler.help = ['simi', 'simsimi', 'simih'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|simih)$/i

module.exports = handler

