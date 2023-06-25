let fetch = require('node-fetch')
let handler = async (m, { text }) => {
if (!text) throw `Masukan Apikey!`
  try {
    let api = await fetch(`https://api.botcahx.live/api/checkkey?apikey=${text}`)
    let body = await api.text()
    m.reply(body)  
  } catch (e) {
    console.log(e) 
    m.reply('Apikey tidak terdaftar!')
  }
}          
handler.command = handler.help = ['checkapi','api'];
handler.tags = ['main'];
handler.premium = false
handler.group = false
module.exports = handler;
