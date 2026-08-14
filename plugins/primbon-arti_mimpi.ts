import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Masukkan Mimpi kamu!\n\ncontoh: ${usedPrefix + command} mandi`;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/primbon/artimimpi?mimpi=${text}&apikey=${btc}`);
  let json = await res.json()
  let anu = [
       `―-ARTI MIMPI-―\n\nMimpi: ${json.result.message.mimpi}\n\nArti: ${json.result.message.arti}\n\nSolusi: ${json.result.message.solusi}`, 
    ]
conn.reply(m.chat,`${(anu)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['artimimpi']
    handler.tags = ['fun']
    handler.command = /^(artimimpi)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler