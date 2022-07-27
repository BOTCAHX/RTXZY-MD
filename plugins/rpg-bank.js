let fs = require('fs')
let handler = async (m, { conn }) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    let name = conn.getName(m.sender)
    let thumbnail = fs.readFileSync('./media/bank.jpg')
    let user = global.db.data.users[who]
let anu = `
🏦 Bank *${user.name}*
⭐ Role : *${user.role}*\n\n
*${user.exp}* Exp ✨
*${user.limit}* Limit 📊
*${user.money}* Money 💵`
      conn.sendButtonImg(m.chat, thumbnail, anu, wm2, 'Menu', '.menu', m) 
}
handler.help = ['bank', 'dompet', 'dompet @user']
handler.tags = ['xp', 'rpg']
handler.command = /^(my|dompet)$/i

module.exports = handler