import fetch from 'node-fetch'
var handler: WaPlugin = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw 'Masukkan Query Link!'
 try {
let anu = await fetch(`https://api.botcahx.eu.org/api/download/xnxxdl?url=${text}&apikey=${btc}`)
let hasil = await anu.json() 

conn.sendMessage(m.chat, { video: { url: hasil.result.url }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
 } catch (e) {
 throw `*Server error!*`
 }
}
handler.command = handler.help = ['xnxxdown'];
handler.tags = ['internet'];
handler.limit = true;
handler.premium = true;

export default handler;
