// let pajak = 0.02
let handler = async (m, { conn, text }) => {
let dapat = (Math.floor(Math.random() * 5000))
  let who
  if (m.isGroup) who = m.mentionedJid[0]
  else who = m.chat
  if (!who) throw 'Tag salah satu lah, yang kamu ingin berdagang bareng'
  if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
  let __timers = (new Date - global.db.data.users[m.sender].lastdagang)
  let _timers = (28800000 - __timers) 
  let timers = clockString(_timers)
  let users = global.db.data.users
  let username = conn.getName(who)
  if (new Date - global.db.data.users[m.sender].lastdagang > 28800000){
  if (4999 > users[who].money) throw 'Target tidak memiliki modal harap masukkan modal 5000'
  if (4999 > users[m.sender].money) throw 'kamu tidak memiliki modal harap masukkan modal 5000'
  users[who].money -= dapat * 1
 users[m.sender].money -= dapat * 1
  global.db.data.users[m.sender].lastdagang = new Date * 1
  conn.reply(m.chat, `Mohon tunggu kak..\nKamu dan @${who.split`@`[0]} sedang berdagang.. 😅\n\nKamu dan @${who.split`@`[0]} meletakkan modal -${dapat} 😅`, m)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 3600000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 7200000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 10800000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 14400000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 18000000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 21600000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +5000\n${users[m.sender].money += 5000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +5000\n${users[who].money += 5000} Money @${who.split`@`[0]}`, m)
					}, 25200000)
  setTimeout(() => {
					conn.reply(m.chat, `Selamat kamu dan @${who.split`@`[0]} mendapatkan money..\n\nPenghasilan dagang kamu didapatkan +10000\n${users[m.sender].money += 10000} Money kamu\n\nPenghasilan dagang @${who.split`@`[0]} didapatkan +10000\n${users[who].money += 10000} Money @${who.split`@`[0]}`, m)
					}, 28800000)
}else conn.reply(m.chat, `Anda Sudah Berdagang , tunggu ${timers} lagi..`, m)
}
handler.help = ['berdagang *@tag*']
handler.tags = ['rpg']
handler.command = /^berdagang$/
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