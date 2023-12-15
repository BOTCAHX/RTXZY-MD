let qrcode = require("qrcode")

let handler = async (m, { conn, text }) => {
  if (!text) throw 'teksnya mana?'
  conn.sendFile(m.chat, await qrcode.toDataURL(text.slice(0, 2048), { scale: 8 }), 'qrcode.png', '', m)
}
handler.help = ['', 'code'].map(v => 'qr' + v + ' <teks>')
handler.tags = ['tools']
handler.command = /^qr(code)?$/i
handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
