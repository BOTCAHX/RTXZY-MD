import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, text }) => {
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
export default handler
