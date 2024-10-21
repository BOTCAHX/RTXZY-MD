let handler = async (m, { args }) => {
  if (args.length !== 1) {
    return conn.reply(m.chat, '• *Example :* .pointomoney 1000', m)
  }
  let poin = parseInt(args[0])
  if (isNaN(poin) || poin < 1) {
    throw 'Jumlah poin yang ingin dikonversi harus lebih dari atau sama dengan 1!'
  }
  let user = global.db.data.users[m.sender]
  if (poin > user.poin) {
    throw 'Maaf, kamu tidak memiliki cukup poin untuk dikonversi.'
  }

  let fee = Math.round(poin * 0.05)
  let moneyp = poin - fee

  let message = `Berikut adalah detail konversi poin ke uang:\n\n`
  message += `• Jumlah Poin: ${poin}\n`
  message += `• Fee (5%): ${fee}\n`
  message += `• Jumlah Uang: ${moneyp}`

  user.poin -= poin
  user.money += moneyp
  global.db.data.users[m.sender] = user
  global.db.write()

  m.reply(message)
}

handler.help = ['pointomoney']
handler.tags = ['rpg']
handler.command = /^pointomoney$/i
handler.register = true
handler.limit = true

module.exports = handler