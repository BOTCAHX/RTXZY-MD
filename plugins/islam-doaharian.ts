import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
try {
  await m.reply(wait)
  let res = await fetch(`https://api.botcahx.eu.org/api/muslim/doaharian?&apikey=${btc}`);
  let json = await res.json()
  var dh = [
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[0].title}\n\nArabic: ${json.result.data[0].arabic}\n\nLatin: ${json.result.data[0].latin}\n\nArti: ${json.result.data[0].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[1].title}\n\nArabic: ${json.result.data[1].arabic}\n\nLatin: ${json.result.data[1].latin}\n\nArti: ${json.result.data[1].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[2].title}\n\nArabic: ${json.result.data[2].arabic}\n\nLatin: ${json.result.data[2].latin}\n\nArti: ${json.result.data[2].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[3].title}\n\nArabic: ${json.result.data[3].arabic}\n\nLatin: ${json.result.data[3].latin}\n\nArti: ${json.result.data[3].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[4].title}\n\nArabic: ${json.result.data[4].arabic}\n\nLatin: ${json.result.data[4].latin}\n\nArti: ${json.result.data[4].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[5].title}\n\nArabic: ${json.result.data[5].arabic}\n\nLatin: ${json.result.data[5].latin}\n\nArti: ${json.result.data[5].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[6].title}\n\nArabic: ${json.result.data[6].arabic}\n\nLatin: ${json.result.data[6].latin}\n\nArti: ${json.result.data[6].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[7].title}\n\nArabic: ${json.result.data[7].arabic}\n\nLatin: ${json.result.data[7].latin}\n\nArti: ${json.result.data[7].translation}`, 
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[8].title}\n\nArabic: ${json.result.data[8].arabic}\n\nLatin: ${json.result.data[8].latin}\n\nArti: ${json.result.data[8].translation}`,
       `―-DOA HARIAN-―\n\nTitle: ${json.result.data[9].title}\n\nArabic: ${json.result.data[9].arabic}\n\nLatin: ${json.result.data[9].latin}\n\nArti: ${json.result.data[9].translation}`, 
 
    ]
conn.reply(m.chat,`${pickRandom(dh)}`);
} catch (e) {
throw eror
  }
}
  
    handler.help = ['doaharian']
    handler.tags = ['islam']
    handler.command = /^(doaharian)$/i
    handler.group = false;
    handler.limit = true; 
    
    export default handler

    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())]
    }