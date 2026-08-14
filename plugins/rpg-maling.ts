const timeout = 604800000

let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
	    let time = global.db.data.users[m.sender].lastmaling + 604800000
  if (Date.now() - global.db.data.users[m.sender].lastmaling< 604800000) return conn.reply(m.chat, `Anda sudah merampok bank\nTunggu selama ${msToTime(time - Date.now())} lagi`, m)
	let money = `${Math.floor(Math.random() * 30000)}`.trim()
	let exp = `${Math.floor(Math.random() * 999)}`.trim()
	let kardus = `${Math.floor(Math.random() * 1000)}`.trim()
	global.db.data.users[m.sender].money += +money
	global.db.data.users[m.sender].exp += +exp
	global.db.data.users[m.sender].kardus += +kardus
	global.db.data.users[m.sender].lastmaling = Date.now()
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
handler.rpg = true
handler.fail = null
handler.limit = false
handler.exp = 0
handler.money = 0

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