const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
const res = await fetch(`https://api.botcahx.eu.org/api/random/katasenja?apikey=${btc}`).then(result => result.json())
let anu =`─────〔 *Galau* 〕─────

${res.senja}
`
m.reply(anu) 
}
handler.help = ['galau']
handler.tags = ['quotes']
handler.command = /^(galau)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
