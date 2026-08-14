const free = 5000
const prem = 10000
const moneyfree = 5000
const moneyprem = 10000
const timeout = 3600000

let handler: WaPlugin = async (m, { conn, isPrems }) => {
    let time = global.db.data.users[m.sender].lasthourly + 3600000
  if (Date.now() - global.db.data.users[m.sender].lasthourly < 3600000) return conn.reply(m.chat, `Anda sudah mengklaim, klaim harian hari ini\ntunggu selama ${msToTime(time - Date.now())} lagi`, m)
        global.db.data.users[m.sender].exp += isPrems ? prem : free
        global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree
        conn.reply(m.chat, `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money`, m)
        global.db.data.users[m.sender].lasthourly = Date.now()
    }
handler.help = ['hourly']
handler.tags = ['rpgabsen']
handler.command = /^(hourly)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.rpg = true
handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0
handler.exp = 0
handler.limit = true

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