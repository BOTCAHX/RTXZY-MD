let handler = async (m, { conn, command }) => {
let nyenye = `https://api.xteam.xyz/randomimage/${command}?APIKEY=8872c3ff7452002c`
    conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['dark']
handler.tags = ['fun']
handler.command = /^(dark)$/i

module.exports = handler
