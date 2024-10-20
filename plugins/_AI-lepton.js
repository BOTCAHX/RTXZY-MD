let fetch = require('node-fetch');
let handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `
try {
  await m.reply(wait)
  let res = await (await fetch(`https://api.botcahx.eu.org/api/search/lepton-ai?apikey=${btc}&text=${text}`)).json()
  await m.reply(res.result.result)
} catch (err) {
  console.error(err)
  throw eror
 }
}
handler.command = handler.help = ['lepton'];
handler.tags = ['tools'];
handler.premium = false
handler.limit = true;
module.exports = handler;
