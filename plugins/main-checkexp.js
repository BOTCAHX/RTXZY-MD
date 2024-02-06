let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Masukan Username Di Website`
  try {
    let api = await fetch(`https://api.botcahx.eu.org/api/checkexp?username=${text}`)
    let body = await api.text()
    m.reply(body)  
  } catch (e) {
    console.log(e) 
    m.reply('Username tidak terdaftar!')
  }
}          
handler.command = handler.help = ['checkexp','cekexp'];
handler.tags = ['main'];
handler.private = true
module.exports = handler;
