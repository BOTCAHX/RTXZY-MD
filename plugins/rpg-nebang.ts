const timeout = 28800000

let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
	    let time = global.db.data.users[m.sender].lastnebang + 28800000
  if (Date.now() - global.db.data.users[m.sender].lastnebang< 28800000) throw `Anda sudah nebang\nMohon tunggu hasil nebang mu\nTunggu selama ${msToTime(time - Date.now())} lagi`
    let kayu = `${Math.floor(Math.random() * 45)}`.trim()
    global.db.data.users[m.sender].kayu += +kayu
	global.db.data.users[m.sender].lastnebang = Date.now()
  conn.reply(m.chat, `Selamat kamu mendapatkan : \n🪵Kayu\n+sebanyak: ${kayu}`, m)
}
handler.help = ['nebang']
handler.tags = ['rpg']
handler.command = /^(nebang)/i
handler.group = true
handler.rpg = true
handler.fail = null
handler.limit = true
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