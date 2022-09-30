let handler = async (m, { conn, command }) => {
let tioapikey = `https://xteam.xyz/randomimage/meme2?APIKEY=8872c3ff7452002c`
    conn.sendButtonImg(m.chat, tioapikey, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['meme2']
handler.tags = ['fun']
handler.command = /^(meme2)$/i
handler.limit = false

module.exports = handler
