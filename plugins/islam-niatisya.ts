import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/niatisya?&apikey=${btc}`);
  let json = await res.json()
  var isy = [
       `―-NIAT ISYA-―\n\n${json.result[0].name}\n\nArab: ${json.result[0].arabic}\n\nLatin: ${json.result[0].latin}\n\nTerjemahan: ${json.result[0].terjemahan}`, 
    ]
conn.reply(m.chat,`${(isy)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['niatisya']
    handler.tags = ['islam']
    handler.command = /^(niatisya)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler

