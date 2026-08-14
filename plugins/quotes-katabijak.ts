import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn }) => {
const res = await fetch(`https://api.botcahx.eu.org/api/random/bijak?apikey=${btc}`).then(result => result.json())


let anu =`─────〔 *Kata Bijak* 〕─────

${res.result}
`
m.reply(anu) 
}
handler.help = ['katabijak']
handler.tags = ['quotes']
handler.command = /^(katabijak)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.register = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

export default handler
