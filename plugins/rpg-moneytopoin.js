let handler = async (m, { args }) => {
  if (args.length !== 1) {
    return conn.reply(m.chat, 'Silakan masukkan jumlah uang yang ingin diubah menjadi poin! Contoh: .moneytopoin 1000', m)
  }
  let money = parseInt(args[0])
  if (isNaN(money) || money <= 0) {
    throw 'Jumlah uang yang dimasukkan harus angka positif!'
  }
  let fee = Math.floor(money * 0.5)
  let poin = Math.floor(money * 0.5)
  let message = `• Kamu menconvert uang senilai ${money}\n`
  message += `• Dan kamu mendapatkan poin senilai ${poin}\n`
  message += `• Biaya fee kamu adalah ${fee}`
  let user = global.db.data.users[m.sender]
  if (!user) {
    user = { poin: 0 }
    global.db.data.users[m.sender] = user
  }
  user.poin = (user.poin || 0) + poin
  user.money -= money
  global.db.write()
  conn.reply(m.chat, message, m)
}

handler.help = ['moneytopoin *<amount>*']
handler.tags = ['rpg']
handler.command = /^moneytopoin$/i
handler.register = true
handler.limit = true

module.exports = handler