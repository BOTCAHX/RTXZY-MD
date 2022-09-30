let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Parameter'
  m.reply('Sedang Diproses...')
  // https://api.lolhuman.xyz/api/photooxy2/pubg?apikey=beta&text1=LoL&text2=Human
  let res = await fetch(`https://lolhuman.herokuapp.com/api/photooxy2/battlefield4?apikey=Dawnfrostkey&text1=${response[0]}&text2=${response[1]}`)
  conn.sendFile(m.chat, res, 'nama.jpg', `Nih Mhank`, m, false)
}
handler.help = ['battlefield'].map(v => v + ' <teks|teks>')
handler.tags = ['sticker']

handler.command = /^(battlefield)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = true

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = true

module.exports = handler