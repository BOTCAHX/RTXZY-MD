let fetch = require('node-fetch')
let handler = async (m, { conn }) => {
try {
  let res = await fetch(`https://api.botcahx.eu.org/api/random/motivasi?&apikey=${btc}`);
  let json = await res.json()
  conn.reply(m.chat, `―MOTIVASI―\n\n"${json.result}"`,);
} catch (e) {
throw `Internal server eror!`
  }
}
handler.help = ['motivasi']
handler.tags = ['quotes']
handler.command = /^(motivasi)$/i

module.exports = handler
