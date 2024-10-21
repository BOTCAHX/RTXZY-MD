const timeout = 604800000

let handler = async (m, { conn, usedPrefix, text }) => {
	    let time = global.db.data.users[m.sender].lastmaling + 604800000
  if (new Date - global.db.data.users[m.sender].lastmaling< 604800000) return conn.reply(m.chat, `Anda sudah merampok bank\nTunggu selama ${msToTime(time - new Date())} lagi`, m)
	let money = `${Math.floor(Math.random() * 30000)}`.trim()
	let exp = `${Math.floor(Math.random() * 999)}`.trim()
	let kardus = `${Math.floor(Math.random() * 1000)}`.trim()
	global.db.data.users[m.sender].money += money * 1
	global.db.data.users[m.sender].exp += exp * 1
	global.db.data.users[m.sender].kardus += kardus * 1
	global.db.data.users[m.sender].lastmaling = new Date * 1
  conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${money} Money\n+${kardus} Kardus\n+${exp} Exp`, m)
}
handler.help = ['maling']
handler.tags = ['rpg']
handler.command = /^(maling)/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.limit = false
handler.exp = 0
handler.money = 0

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