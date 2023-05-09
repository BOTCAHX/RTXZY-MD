let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
let tio = await fetch('https://raw.githubusercontent.com/HasamiAini/wabot_takagisan/main/whatsapp%20bot%20takagisan/whatsapp%20bot%20takagisan/lib/memeindo.json')
let json = await tio.json();
let url = json[Math.floor(Math.random() * json.length)]
await conn.sendFile(m.chat, url.image, 'file.jpg', wm, m)
}
handler.command = /^(meme)$/i
handler.tags = ['fun']
handler.help = ['meme']
handler.limit = true
module.exports = handler