import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/niatdzuhur?&apikey=${btc}`);
  let json = await res.json()
  var dzh = [
       `―-NIAT DZUHUR-―\n\n${json.result[0].name}\n\nArab: ${json.result[0].arabic}\n\nLatin: ${json.result[0].latin}\n\nTerjemahan: ${json.result[0].terjemahan}`, 
    ]
conn.reply(m.chat,`${(dzh)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['niatdzuhur']
    handler.tags = ['islam']
    handler.command = /^(niatdzuhur)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler