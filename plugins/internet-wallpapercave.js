let handler = async(m, { conn, text }) => {
if (!text) return conn.reply(m.chat, 'Silahkan masukan query', m)
let tetete = `https://api.zacros.my.id/search/wallpapercave?query=${text}`
conn.sendButtonImg(m.chat, tetete, `Hasil Dari ${text}`, wm2, 'Thanks', 'thanks', m) 
}
handler.help = ['wallpapercave'].map(v => v + ' <query>')
handler.tags = ['anime', 'internet']
handler.command = /^(wallpapercave)$/i

module.exports = handler