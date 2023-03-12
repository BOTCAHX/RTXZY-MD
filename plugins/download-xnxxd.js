var fetch = require("node-fetch")
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw 'Masukkan Query Link!'
 
let anu = await fetch(`https://api-fgmods.ddns.net/api/xnxxdl?url=${text}&apikey=BgCbiEyg`)
let hasil = await anu.json() 

conn.sendMessage(m.chat, { video: { url: hasil.result.files.low }, fileName: 'xnxx.mp4', mimetype: 'video/mp4' }, { quoted: m })
  }                                                    
handler.command = handler.help = ['xnxxdown','downxmxx'];
handler.tags = ['downloader'];
module.exports = handler;
