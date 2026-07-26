import fetch from 'node-fetch'
let handler = async (m, { conn }) => {
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/news/cnn?&apikey=${btc}`);
  let json = await res.json()
  var news = [
       `―CNNC―\n\nBerita: ${json.result[0].berita}\n\nBeritaUrl: ${json.result[0].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[1].berita}\n\nBeritaUrl: ${json.result[1].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[2].berita}\n\nBeritaUrl: ${json.result[2].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[3].berita}\n\nBeritaUrl: ${json.result[3].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[4].berita}\n\nBeritaUrl: ${json.result[4].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[5].berita}\n\nBeritaUrl: ${json.result[5].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[6].berita}\n\nBeritaUrl: ${json.result[6].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[7].berita}\n\nBeritaUrl: ${json.result[7].berita_url}`, 
       `―CNNC―\n\nBerita: ${json.result[8].berita}\n\nBeritaUrl: ${json.result[8].berita_url}`, 
    
    ]
conn.reply(m.chat,`${pickRandom(news)}`);;
} catch (e) {
throw eror
  }
}
  
    handler.help = ['cnn']
    handler.tags = ['news']
    handler.command = /^(cnn)$/i
    handler.group = false
    handler.limit = true
    
    export default handler

    function pickRandom(list) {
      return list[Math.floor(list.length * Math.random())]
    }
    
