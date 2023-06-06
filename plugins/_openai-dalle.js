let fetch = require('node-fetch')
let handler = async (m, { text, command, conn }) => {

  if (!text) throw 'Masukan teks untuk diubah menjadi gambar'

  let response = await fetch(`https://botcahx.vercel.app/dalle?text=${encodeURIComponent(text)}`)
  let image = await response.buffer()
  conn.sendFile(m.chat, image, 'aiimg.jpg',  wm, m)

}
handler.command = handler.help = ['dalle','aiimg','aiimage','ai-image']
handler.tags = ['info']

module.exports = handler
