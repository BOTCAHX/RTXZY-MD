let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
  let res = await fetch('https://x-restapi.herokuapp.com/api/random-cehor?apikey=BETA')
  if (!res.ok) throw await res.text()
  let json = await res.json()
    let more = String.fromCharCode(8206)
    let readMore = more.repeat(4001)
let anu = `*${json.judul}*
${readMore}
${json.desc}`
  const ftroli = {
    key : {
    remoteJid: '6283136505591-1614953337@g.us',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 26-9999, 
    status: 1,
    surface : 1,
    message: 'Random Cerita Horor', 
    orderTitle: `▮Menu ▸`,
    thumbnail: 'https://telegra.ph/file/5ecbec3e82e247671a18e.jpg', 
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
  conn.sendBut(m.chat, anu, wm2, 'Cerita Horor', '.ceritahoror', ftroli) 
}
handler.help = ['ceritahorror', 'ceritahantu']
handler.tags = ['internet', 'fun']
handler.command = /^(ceritahorror|ceritahoror|ceritahantu)$/i

module.exports = handler
