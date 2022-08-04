let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Text\nContoh : .pubg BOTCAHX'
  m.reply('_Proses..._')
  let res = `https://botcahx-rest-api.herokuapp.com/api/photooxy/pubg?text=Pubg&text2=${response[0]}`
  conn.sendFile(m.chat, res, 'botcahx.jpg', `© BOTCAHX`, m, false)
}
handler.help = ['pubg'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(pubg)$/i

module.exports = handler
