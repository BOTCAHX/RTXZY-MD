let fetch = require('node-fetch')
let handler  = async (m, { conn }) => {
  ddd = await fetch('https://recoders-area.caliph.repl.co/api/fakta?apikey='+APIKeys["https://recoders-area.caliph.repl.co"])
  f = await ddd.json()
let anu =`
────〔 *Fakta Unik* 〕────

${f.result}
`
  conn.sendBut(m.chat, anu, wm2, 'Fakta Unik', '.faktaunik', m) 
} 
handler.help = ['fakta unik']
handler.tags = ['internet']
handler.command = /^(fakta|faktaunik)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
