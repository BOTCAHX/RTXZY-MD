import fetch from 'node-fetch';
let handler: WaPlugin = async (m, {
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
handler.tags = ['ai'];
handler.premium = false
handler.limit = true;

export default handler;
