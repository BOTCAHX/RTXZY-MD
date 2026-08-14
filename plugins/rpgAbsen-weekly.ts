const free = 10000
const prem = 20000
const limitfree = 10
const limitprem = 20
const moneyfree = 10000
const moneyprem = 20000

let handler: WaPlugin = async (m, { conn, isPrems }) => {
    let time = global.db.data.users[m.sender].lastweekly + 604800000
  if (Date.now() - global.db.data.users[m.sender].lastweekly < 604800000) throw `Anda sudah mengklaim, klaim mingguan ini\ntunggu selama ${msToTime(time - Date.now())} lagi`
        global.db.data.users[m.sender].exp += isPrems ? prem : free
        global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree
        global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree
        conn.reply(m.chat, `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money\n+${isPrems ? limitprem : limitfree} Limit`, m)
        global.db.data.users[m.sender].lastweekly= Date.now()
    }
    
handler.help = ['weekly']
handler.tags = ['rpgabsen']
handler.command = /^(weekly)$/i
handler.limit = true
handler.fail = null
handler.rpg = true
export default handler

function msToTime(duration) {
  var milliseconds = parseInt(String((duration % 1000) / 100)),
    seconds = String(Math.floor((duration / 1000) % 60)),
    minutes = String(Math.floor((duration / (1000 * 60)) % 60)),
    hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24)),
    weeks = String(Math.floor((duration / (1000 * 60 * 60 * 24)) % 168));
  weeks = "" + ((+weeks < 10) ? "0" + weeks : weeks);
  hours = "" + ((+hours < 10) ? "0" + hours : hours)
  minutes = "" + ((+minutes < 10) ? "0" + minutes : minutes)
  seconds = "" + ((+seconds < 10) ? "0" + seconds : seconds)

  return weeks + " hari " +  hours + " jam " + minutes + " menit"
}