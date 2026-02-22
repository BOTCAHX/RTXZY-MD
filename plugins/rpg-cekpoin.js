let handler = async (m) => {
  let poin = global.db.data.users[m.sender].poin || 0
  m.reply(`Poin kamu: ${poin}`)
}

handler.help = ['cekpoin']
handler.tags = ['rpg']
handler.command = /^cekpoin$/i
handler.register = true
handler.rpg = true

module.exports = handler