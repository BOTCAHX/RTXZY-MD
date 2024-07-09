let fetch = require('node-fetch');

let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* buatkan saya code express.js`
try {
  await m.reply(wait)
  let res = await (await fetch(`https://api.botcahx.eu.org/api/search/blackbox-chat?text=${text}&apikey=${btc}`)).json()
  await m.reply(res.message)
} catch (err) {
  console.error(err)
  throw eror
}
}
handler.command = handler.help = ['blackbox','blackboxai','aicoding'];
handler.tags = ['tools'];
handler.premium = false
module.exports = handler;
