const free = 200000
const prem = 400000
const limitfree = 200
const limitprem = 400
const moneyfree = 200000
const moneyprem = 400000

let handler: WaPlugin = async (m, { conn, isPrems }) => {
    let time = global.db.data.users[m.sender].lastyearly + 31536000000
  if (Date.now() - global.db.data.users[m.sender].lastyearly < 31536000000) throw `Anda sudah mengklaim, klaim tahunan ini\ntunggu selama ${msToTime(time - Date.now())} lagi`
        global.db.data.users[m.sender].exp += isPrems ? prem : free
        global.db.data.users[m.sender].money += isPrems ? moneyprem : moneyfree
        global.db.data.users[m.sender].limit += isPrems ? limitprem : limitfree
        conn.reply(m.chat, `Selamat kamu mendapatkan:\n\n+${isPrems ? prem : free} Exp\n+${isPrems ? moneyprem : moneyfree} Money\n+${isPrems ? limitprem : limitfree} Limit`, m)
        global.db.data.users[m.sender].lastyearly = Date.now()
    }
handler.help = ['yearly']
handler.tags = ['rpgabsen']
handler.command = /^(yearly)$/i
handler.limit = true
handler.rpg = true
handler.fail = null

export default handler

function msToTime(duration) {
  var milliseconds = parseInt(String((duration % 1000) / 100)),
    seconds = String(Math.floor((duration / 1000) % 60)),
    minutes = String(Math.floor((duration / (1000 * 60)) % 60)),
    hours = String(Math.floor((duration / (1000 * 60 * 60)) % 24)),
    monthly = String(Math.floor((duration / (1000 * 60 * 60 * 24)) % 720));
  monthly = "" + ((+monthly < 10) ? "0" + monthly : monthly);
  hours = "" + ((+hours < 10) ? "0" + hours : hours)
  minutes = "" + ((+minutes < 10) ? "0" + minutes : minutes)
  seconds = "" + ((+seconds < 10) ? "0" + seconds : seconds)

  return monthly + " hari " +  hours + " jam " + minutes + " menit"
}