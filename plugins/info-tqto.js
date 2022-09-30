/**
* jangan ganti ya kakak kakak sekalian
* ini cuma buat ninggalin credit gw doang :)
* jangan dihilangin, boleh di tambahin 🐦
**/

let handler = async (m, { conn }) => {
bear = "Source Code"
let esce = 'Big Thanks to\n\n Allah swt\nMy friends\nDatabase Replit.'
conn.sendButtonImg(m.chat, fla + 'Thanks To', esce, wm2, 'Makasih', 'thanks', m) 
}
handler.help = ['tqto', 'team']
handler.tags = ['info']
handler.command = /^(tqto|team)$/i

module.exports = handler
