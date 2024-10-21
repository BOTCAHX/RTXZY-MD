/** !! THIS CODE GENERATE BY RODOTZBOT !! **/

const moment = require('moment-timezone')

let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender]
  if (!user) throw 'Anda belum terdaftar di database'

  if (user.kerjalima && user.kerjalima > Date.now()) {
    let remainingTime = (user.kerjalima - Date.now()) / 1000 
    let hours = Math.floor(remainingTime / 3600)
    remainingTime %= 3600
    let minutes = Math.floor(remainingTime / 60)
    let seconds = Math.floor(remainingTime % 60)
    let remainingTimeString = `${hours} jam ${minutes} menit ${seconds} detik`
    throw `Anda masih memiliki misi yang sedang berlangsung. Silakan coba lagi dalam *${remainingTimeString}.*`
  }

  m.reply('Anda sedang mengerjakan misi..')
  await delay(2000)

  let randomMoney = Math.floor(Math.random() * (1000000 - 10000 + 1) + 10000)
  let randomExp = Math.floor(Math.random() * (1000 - 100 + 1) + 100)
  let randomLimit = Math.floor(Math.random() * (20 - 10 + 1) + 10)

  user.money += randomMoney
  user.exp += randomExp
  user.limit += randomLimit

  let replyMsg = `*Selamat Anda Telah Mengerjakan Misi Hari Ini*

◦ *Money:* ${randomMoney}
◦ *Exp:* ${randomExp}
◦ *Limit:* ${randomLimit}`

  global.db.data.users[m.sender] = user
  m.reply(replyMsg)

  user.kerjalima = Date.now() + 86400000 
  global.db.data.users[m.sender] = user
}

handler.help = ['dailymisi']
handler.tags = ['rpg']
handler.limit = true
handler.command = /^dailymisi$/i

module.exports = handler

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}