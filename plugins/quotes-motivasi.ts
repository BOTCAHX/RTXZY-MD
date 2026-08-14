import fetch from 'node-fetch'
let handler: WaPlugin = async (m, { conn }) => {
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

export default handler
