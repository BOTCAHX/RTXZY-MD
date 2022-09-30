let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
   response = args.join(' ').split('|')
   if (!args[0]) return m.reply('masukkan text1 dan text2\n\nContok: .sadboylogo elyas|ganzz')
   m.reply('*Wait Ngab*\nProses...')
  let res = `https://melcanz.com/sadboy?nama=${response[0]}&nama2=${response[1]}&apikey=dUtJxxvp`
  conn.sendFile(m.chat, res, 'sadboy.jpg', `Sudah Jadi`, m, false)
}
handler.help = ['sadboylogo'].map(v => v + ' <text|text>')
handler.tags = ['maker']
handler.command = /^(sadboylogo)$/i

module.exports = handler
