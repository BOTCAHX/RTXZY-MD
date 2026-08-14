const timeout = 28800000

let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
	    let time = global.db.data.users[m.sender].lastturu + 28800000
  if (Date.now() - global.db.data.users[m.sender].lastturu< 28800000) throw `Anda sudah memulung\nMohon tunggu selama ${msToTime(time - Date.now())} untuk mulung lagi`
    let botolnye = `${Math.floor(Math.random() * 1000)}`.trim()
	let kalengnye = `${Math.floor(Math.random() * 1000)}`.trim()
	let kardusnye = `${Math.floor(Math.random() * 1000)}`.trim()
	global.db.data.users[m.sender].botol += +botolnye
	global.db.data.users[m.sender].kaleng += +kalengnye
	global.db.data.users[m.sender].kardus += +kardusnye
	global.db.data.users[m.sender].lastturu = Date.now()
  conn.reply(m.chat, `Selamat kamu mendapatkan : \n+${botolnye} Botol\n+${kardusnye} Kardus\n+${kalengnye} Kaleng`, m)
}
handler.help = ['mulung']
handler.tags = ['rpg']
handler.command = /^(mulung)/i
handler.group = true

handler.fail = null
handler.limit = true
handler.exp = 0
handler.money = 0
handler.rpg = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt(String((duration % 1000) / 100)),
    seconds = String(Math.floor((duration / 1000) % 60)),
    minutes = String(Math.floor((duration / (1000 * 60)) % 60)),
    hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24));    
  
  hours = "" + ((+hours < 10) ? "0" + hours : hours)
  minutes = "" + ((+minutes < 10) ? "0" + minutes : minutes)
  seconds = "" + ((+seconds < 10) ? "0" + seconds : seconds)

  return hours + " jam " + minutes + " menit " + seconds + " detik"
}