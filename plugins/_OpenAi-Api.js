var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
try {
  var apii = await fetch(`https://api.ibeng.tech/api/info/gpt3?text=${text}&apikey=tamvan`)
  var js = await apii.json()
  m.reply(js.data.data)
} catch(e) {
  try {
    var apii2 = await fetch(`https://mfarels.my.id/api/openai?text=${text}`)
    var js2 = await apii2.json()
    m.reply(js2.result)
  } catch(e) {
    m.reply('Error: Server down!')
  }
}
}      
handler.command = handler.help = ['ai' 'chatgpt'];
handler.tags = ['internet'];
handler.premium = false
module.exports = handler;
