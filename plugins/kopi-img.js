let handler = async (m, { conn, command }) => {
let nyenye = `https://botcahx-rest-api.up.railway.app/api/randomgambar/coffee`
    conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.ngopi`, m) 
}
handler.help = ['ngopi']
handler.tags = ['internet']
handler.command = /^(ngopi)$/i
module.exports = handler
