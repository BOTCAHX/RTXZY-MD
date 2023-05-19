var fetch = require('node-fetch');
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
await m.reply(wait)
  var apii = await fetch(`https://api.botcahx.live/api/search/openai-chat?text=${text}&apikey=${btc}`)
  var js = await apii.json()
  await m.reply(js.message)
}      
handler.command = handler.help = ['ai','openai','chatgpt'];
handler.tags = ['internet'];
handler.premium = false
module.exports = handler;
