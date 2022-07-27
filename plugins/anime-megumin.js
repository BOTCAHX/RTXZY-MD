let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
  let res = await fetch('https://api.waifu.pics/sfw/megumin')
  if (!res.ok) throw 'Error Website sedang down'
  let json = await res.json()
  if (!json.url) throw 'Error!'
  let wm = global.wm
ftrol = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: 'Random Megumin', 
    orderTitle: `▮Menu ▸`,
    thumbnail: 'https://telegra.ph/file/20509b31b6e05ff999daa.jpg'
    }
    }
    } 
  conn.sendFile(m.chat, json.url, '', 'Istri Watashi', ftrol, 0, { thumbnail: Buffer.alloc(0) })
}
handler.help = ['megumin']
handler.tags = ['anime']
handler.command = /^(megumin)$/i

handler.limit = true

module.exports = handler
