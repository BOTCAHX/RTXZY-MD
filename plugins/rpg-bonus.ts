let handler: WaPlugin = async (m, { conn, usedPrefix, text }) => {
    let user = global.db.data.users[m.sender]
	let time = user.lastclaimb1 + 86400000
    if (Date.now() - user.lastclaimb1 < 86400000) throw `Kamu Sudah Ambil Bonus Hari Ini\nTunggu selama ${msToTime(time - Date.now())} lagi`
	let money = `${Math.floor(Math.random() * 5000000)}`.trim()
	user.money += +money
	user.lastclaimb1 = Date.now()
  m.reply(`Selamat Kamu Mendapatkan Bonus : \n+${money} Money`)
}
handler.help = ['bonus']
handler.tags = ['rpg', 'prem']
handler.command = /^(bonus)/i
handler.register = true
handler.premium = true
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