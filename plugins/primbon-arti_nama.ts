import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
if (!text) throw `Masukkan Nama!\n\ncontoh: ${usedPrefix + command} Budi`;
try {
  await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/primbon/artinama?nama=${text}&apikey=${btc}`);
  let json = await res.json()
  let anu = [
       `―-ARTI NAMA-―\n\nNama: ${json.result.message.nama}\n\nArti: ${json.result.message.arti}`, 
    ]
conn.reply(m.chat,`${(anu)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['artinama']
    handler.tags = ['fun']
    handler.command = /^(artinama)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler