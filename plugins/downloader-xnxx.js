var fetch = require("node-fetch")
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} boobs`


await conn.sendMessage(m.chat, { react: { text: `🍑`, key: m.key }})
                                  if (!text) throw `${prefix + command} big boobs`
                                  
                                  let search = await fetch(`https://api-fgmods.ddns.net/api/xnxxsearch?q=${text}&apikey=BgCbiEyg`)
 let hasil = await search.json()

let teks = '*XNXX RESULTS* '+text+'\n\n'
                                  let no = 1
                                  for (let i of hasil.result) {
                                      teks += `🔵 No : ${no++}\n👽 title - ${i.title}\n🔄 Duration : ${i.duration}\n 🤤 URL - ${i.link}\n\n─────────────────\n\n`
                                  }
                                  conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/d16784c059f7a3da28e07.jpg' },  caption: teks }, { quoted: m })
  }                                                    
handler.command = handler.help = ['xnxxsearch','sxnxx'];
handler.tags = ['downloader'];
module.exports = handler;
