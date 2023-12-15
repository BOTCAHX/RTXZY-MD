let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Masukan pertanyaan!`
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/search/simsimi?query=${encodeURIComponent(text)}&apikey=${btc}`)
  let json = await res.json()
  m.reply(json.result)
} catch (e) {
throw `Internal server eror!`
  }
}
handler.help = ['simi', 'simsimi', 'simih'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|simih)$/i

module.exports = handler
