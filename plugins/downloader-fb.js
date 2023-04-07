var api = require('hxz-api')
var handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Gunakan link Facebook!\n\n📌 Example:\n*${usedPrefix + command}* https://fb.watch/7B5KBCgdO3`
  try {  
    var response = await api.fbdown(text) 
    conn.sendFile(m.chat, response.Normal_video, 'fb.mp4', wm, m)
  } catch (e) { 
    console.log(e) 
    conn.reply(m.chat, `Terjadi kesalahan! Mohon coba lagi atau gunakan format yang benar.`, m)
  }
}
handler.help = ['facebook'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^((facebook|fb)(downloder|dl)?)$/i
module.exports = handler
