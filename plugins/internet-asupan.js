let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join('0').split('0')
  let tioxd = `https://sekha.me/api/asupan?apikey=apirey`
  conn.sendFile(m.chat, tioxd, 'botcahx.mp4', 'Asupan beta with apikey', m, false, { contextInfo: { forwardingScore: 9999, isForwarded: true }})
}
handler.help = ['randomasupan', 'asupanrandom']
handler.tags = ['internet']
handler.command = /^(randomasupan|asupanrandom)$/i
handler.limit = true
handler.group = false

module.exports = handler
