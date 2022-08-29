// beta list menu ujicoba doang 

let handler = async (m, { conn, text, usedPrefix, command }) => {
let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)
    let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')
   let ar = ['list', 'menu']
   let ras = `Hai Kak  @${m.sender.split('@')[0]} 👋`
    let sel = `*© Rtxzy*`
    let rs = `Click Here`
const sections = [ {
	title: `☁️ Aktif ${uptime} || ⏲️ Jam ${time} WIB`,
	rows: [
	    {title: `Semua Perintah`, rowId: `.a `},//, description: ``},
            {title: `All CMD Payment`, rowId: `.pay `},//, description: ``},
	    {title: `Owner`, rowId: `#owner `},//, description: ``},
        {title: `Donasi`, rowId: `#donasi `},//, description: ``},
        {title: `Script`, rowId: `#sc `},//, description: ``},
        {title: `Group Official`, rowId: `#gcbot `},//, description: ``},
        {title: `Speed`, rowId: `#speed `},//, description: ``},
        {title: `List Texpro Maker`, rowId: `#textpro `},//, description: ``},
        ]
 } ]

const listMessage = {
  text: sel,
  mentions: [m.sender],
  footer: 'Jika menemukan bug,error atau kesulitan dalam penggunaan silahkan laporkan/tanyakan kepada owner.',
  title: ras,
  buttonText: rs,
  sections
}

  if(!text) return conn.sendMessage(m.chat, listMessage, { quoted: m })
  if (!ar.includes(text)) throw conn.sendMessage(m.chat, listMessage, { quoted: m })
  if (!res.ok) throw `${res.status} ${res.statusText}`
  let json = await res.json()
  if (!json.image) throw json
}

handler.help = ['Menu'].map((v) => v + ' <List>')
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

module.exports = handler
function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
