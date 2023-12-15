let fetch = require('node-fetch')

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} https://drive.google.com/file/d/1thDYWcS5p5FFhzTpTev7RUv0VFnNQyZ4/view?usp=drivesdk`
    m.reply(wait)   
    try {     
        let json = await fetch(`https://api.botcahx.eu.org/api/download/gdrive?url=${text}&apikey=${btc}`).then(res => res.json());                  
        conn.sendMessage(m.chat, { document: { url: json.result.data }, fileName: json.result.fileName, mimetype: json.result.mimetype }, { quoted: m })
    } catch (e) {     
        throw `Error: ${eror}`
    }
}
handler.command = handler.help = ['gdrive','gdrivedl']
handler.tags = ['downloader']
handler.limit = true
module.exports = handler
