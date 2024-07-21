let fetch = require('node-fetch')

let handler = async (m, { conn }) => {
  try { 
    m.reply(wait)
    let res = await (await fetch(`https://api.botcahx.eu.org/api/webzone/gore?apikey=${btc}`)).json()
    let capt = `*R A N D O M   G O R E*\n\n`
    capt += `  ◦  *Title*: ${res.result.title}\n`;
    capt += `  ◦  *Author*: ${res.result.author}\n`;;
    capt += `  ◦  *Views*: ${res.result.views}\n`;
    capt += `  ◦  *Comment*: ${res.result.comments}\n`;
    conn.sendFile(m.chat, res.result.url, null, capt, m)
} catch (error) {
  throw eror
  }
}
handler.command = handler.help = ['randomgore','gore'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler
