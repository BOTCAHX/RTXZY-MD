import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/bacaanshalat?&apikey=${btc}`);
  let json = await res.json()
  global.anu = [
       `―-BACAAN SHALAT-―\n\n${json.result[0].name}\n\nArab: ${json.result[0].arabic}\n\nLatin: ${json.result[0].latin}\n\nTerjemahan: ${json.result[0].terjemahan}`,
       `\n\n${json.result[1].name}\n\nArab: ${json.result[1].arabic}\n\nLatin: ${json.result[1].latin}\n\nTerjemahan: ${json.result[1].terjemahan}`, 
       `\n\n${json.result[2].name}\n\nArab: ${json.result[2].arabic}\n\nLatin: ${json.result[2].latin}\n\nTerjemahan: ${json.result[2].terjemahan}`, 
       `\n\n${json.result[3].name}\n\nArab: ${json.result[3].arabic}\n\nLatin: ${json.result[3].latin}\n\nTerjemahan: ${json.result[3].terjemahan}`, 
       `\n\n${json.result[4].name}\n\nArab: ${json.result[4].arabic}\n\nLatin: ${json.result[4].latin}\n\nTerjemahan: ${json.result[4].terjemahan}`, 
       `\n\n${json.result[5].name}\n\nArab: ${json.result[5].arabic}\n\nLatin: ${json.result[5].latin}\n\nTerjemahan: ${json.result[5].terjemahan}`, 
       `\n\n${json.result[6].name}\n\nArab: ${json.result[6].arabic}\n\nLatin: ${json.result[6].latin}\n\nTerjemahan: ${json.result[6].terjemahan}`, 
       `\n\n${json.result[7].name}\n\nArab: ${json.result[7].arabic}\n\nLatin: ${json.result[7].latin}\n\nTerjemahan: ${json.result[7].terjemahan}`, 

    ]
conn.reply(m.chat,`${(global.anu)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['bacaanshalat']
    handler.tags = ['islam']
    handler.command = /^(bacaanshalat|bacaansolat)$/i
    handler.group = false;
    handler.limit = true; 
    export default handler

