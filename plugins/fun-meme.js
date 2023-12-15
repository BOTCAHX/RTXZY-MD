let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
try { 
let img = await fetch(`https://api.botcahx.eu.org/api/random/meme?apikey=${btc}`).then(result => result.buffer())
await conn.sendFile(m.chat, img, 'file.jpg', wm, m)
} catch (e) {
throw `Error ${eror}`
 }
}
handler.command = /^(meme)$/i
handler.tags = ['fun']
handler.help = ['meme']
handler.limit = true
module.exports = handler
