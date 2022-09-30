let handler = async (m, { conn, command }) => {
let tioapikey = `https://xteam.xyz/randomimage/meme?APIKEY=8872c3ff7452002c`
    conn.sendButtonImg(m.chat, tioapikey, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['meme']
handler.tags = ['fun']
handler.command = /^(meme)$/i
handler.limit = false

module.exports = handler
