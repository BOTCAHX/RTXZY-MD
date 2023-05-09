let { MessageType } = require('@adiwajshing/baileys')
let pajak = 0.02
let handler = async (m, { conn, text }) => {
let dapat = (Math.floor(Math.random() * 10000000000000000))
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah'
  let __timers = (new Date - global.db.data.users[m.sender].lastrob)
  let _timers = (3600000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.data.users
  if (new Date - global.db.data.users[m.sender].lastrob > 3600000){
  if (10000 > users[who].money) throw 'Target Gaada Uang bodoh, Kismin dia'
  users[who].money -= 80128896815 // dapat * 1
  users[m.sender].money += 80128896815 // dapat * 1
  global.db.data.users[m.sender].lastrob = new Date * 1
  m.reply(`Berhasil Merampok Money Target Sebesar ${dapat}`)
}else conn.reply(m.chat, `Anda Sudah merampok dan berhasil sembunyi , tunggu ${timers} untuk merampok lagi`, m)
}
handler.help = ['merampok *@tag*']
handler.tags = ['rpg']
handler.command = /^merampok$/
handler.limit = true
handler.group = true

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}