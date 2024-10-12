let fetch = require('node-fetch');

let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* buatkan saya code express.js`
try {
  await m.reply(wait)
  let res = await (await fetch(`https://api.botcahx.eu.org/api/search/blackbox-chat?apikey=${btc}&text=${text}`)).json()
  await m.reply(res.message)
} catch (e) {
  throw eror
}
}
handler.command = handler.help = ['blackbox','blackboxai','aicoding'];
handler.tags = ['tools'];
handler.limit = true

module.exports = handler;
