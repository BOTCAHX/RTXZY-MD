import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
try {
    await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/wirid?apikey=${btc}`);
  let json = await res.json()
  var wrd = [
    `―-WIRID-―\n\nId: ${json.result.data[0].id}\n\nWaktu: ${json.result.data[0].times}\n\nArabic: ${json.result.data[0].arabic}`, 
    `―-WIRID-―\n\nId: ${json.result.data[1].id}\n\nWaktu: ${json.result.data[1].times}\n\nArabic: ${json.result.data[1].arabic}`, 
    `―-WIRID-―\n\nId: ${json.result.data[2].id}\n\nWaktu: ${json.result.data[2].times}\n\nArabic: ${json.result.data[2].arabic}`, 

    ]
conn.reply(m.chat,`${pickRandom(wrd)}`);
} catch (e) {
throw eror
  }
}
  
    handler.help = ['wirid']
    handler.tags = ['islam']
    handler.command = /^(wirid)$/i
    handler.group = false;
    handler.limit = true; 
        
    export default handler

    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())]
    }