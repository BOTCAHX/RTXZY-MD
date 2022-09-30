let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) throw 'cari apa?'
  let res = await fetch(`https://hadi-api.herokuapp.com/api/wiki?query=${text}`)
  let json = await res.json()
  if (json.status) m.reply(`*WIKIPEDIA*

${json.result}`)
  else throw 'not found'
}
handler.help = ['wiki <pencarian>', 'wikipedia <pencarian']
handler.tags = ['internet']
handler.command = /^wiki|wikipedia$/i

module.exports = handler
