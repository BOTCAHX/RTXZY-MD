const dir = [
   'https://www.random.org/dice/dice1.png', 
   'https://www.random.org/dice/dice2.png', 
   'https://www.random.org/dice/dice3.png', 
   'https://www.random.org/dice/dice4.png', 
   'https://www.random.org/dice/dice5.png', 
   'https://www.random.org/dice/dice6.png'
   ];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dadu.webp', '', m)
}
handler.help = ['dadu2']
handler.tags = ['game']
handler.command = /^(dadu2|dice)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = false

module.exports = handler

