let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let _timers = (604800000 - (new Date - user.lastweekly))
    let timers = clockString(_timers) 
    if (new Date - user.lastweekly > 604800000) {
    let wekli = 'https://telegra.ph/file/e4a2f4339da8a32ad20a1.jpg'
    let str = `+2000 money 💹\n+3 Legendary crate 🧰\n+5 String 🕸️\n+2 Iron ⛓️\n+1 Gold 🪙`
        conn.send2ButtonImg(m.chat, wekli, str, wm, 'Claim', '.claim', 'Monthly', '.monthly', m)
        conn.reply(str)
        user.money += 20000
        user.legendary += 3
        user.iron += 2
        user.emas += 1
        user.string += 5
        user.lastweekly= new Date * 1
    } else {
        let buts = `silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi`
        conn.sendBut(m.chat, buts, wm3, 'Berburu', '.berburu', m) 
    }
}
handler.help = ['weekly']
handler.tags = ['rpg']
handler.command = /^(weekly)$/i

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

