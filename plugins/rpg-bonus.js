let handler = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
	let time = user.lastclaimb1 + 86400000
    if (new Date - user.lastclaimb1 < 86400000) throw `Kamu Sudah Ambil Bonus Hari Ini\nTunggu selama ${msToTime(time - new Date())} lagi`
	let money = `${Math.floor(Math.random() * 5000000)}`.trim()
	user.money += money * 1
	user.lastclaimb1 = new Date * 1
  m.reply(`Selamat Kamu Mendapatkan Bonus : \n+${money} Money`)
}
handler.help = ['bonus']
handler.tags = ['rpg', 'prem']
handler.command = /^(bonus)/i
handler.register = true
handler.premium = true
handler.rpg = true
module.exports = handler

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    
  
  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}