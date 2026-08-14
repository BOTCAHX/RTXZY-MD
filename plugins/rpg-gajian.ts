let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
	let time = user.lastclaimb2 + 86400000
    if (Date.now() - user.lastclaimb2 < 86400000) throw `Kamu Sudah Ambil Gaji Hari Ini\nTunggu selama ${msToTime(time - Date.now())} lagi`
	let money = `${Math.floor(Math.random() * 5000000)}`.trim()
	user.money += 50000
	user.lastclaimb2 = Date.now()
  m.reply(`Kamu Mendapatkan 50.000 Money`)
}
handler.help = ['gajian']
handler.tags = ['rpg']
handler.command = /^(gaji|gajian)/i
handler.register = true
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