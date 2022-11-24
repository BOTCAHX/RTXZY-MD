let fs = require('fs')
let handler = async (m, { conn }) => {
let teks = 'Creator'
let numberowner = global.numberowner
let anu = `
Contact Owner:
wa.me/${numberowner}

_Itu adalah nomor owner/creator bot_`
  conn.sendButtonImg(m.chat, fla + teks, anu, instagram, 'Thanks', 'thanks', m) 
}
handler.help = ['main']
handler.tags = ['info']
handler.command = /^(owner|creator)$/i

module.exports = handler
