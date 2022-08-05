let handler = async (m, { conn, command }) => {
let nyenye = `http://hadi-api.herokuapp.com/api/walpaperanime`
    conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.wallpaperanime`, m) 
}
handler.help = ['wallpaperanime']
handler.tags = ['internet']
handler.command = /^(wallpaper|wp)anime$/i
handler.limit = true

module.exports = handler
