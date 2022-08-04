let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Text\nContoh : .coffee BOTCAHX'
  m.reply('_Proses..._')
  let res = `https://botcahx-rest-api.herokuapp.com/api/photooxy/coffee-cup?text=${response[0]}`
  conn.sendFile(m.chat, res, 'botcahx.jpg', `© BOTCAHX`, m, false)
}
handler.help = ['coffee'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(coffee)$/i

module.exports = handler
