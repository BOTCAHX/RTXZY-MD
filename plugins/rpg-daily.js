let handler = async (m, { conn }) => {
    let wm = global.wm2
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastclaim)
    let _timers = (86400000 - __timers)
    let timers = clockString(_timers) 
    if (new Date - user.lastclaim > 86400000) {
    let clem = 'https://telegra.ph/file/842056b40a595f5beee97.jpg'
    let str = `+1000 money 💹\n+2 potion 🥤\n+2 Kayu 🪵`
        conn.send2ButtonImg(m.chat, clem, str, wm2, 'Weekly', '.weekly', 'Monthly', '.monthly', m)
        conn.reply(str)
        global.db.data.users[m.sender].money += 1000
        global.db.data.users[m.sender].kayu += 2
        global.db.data.users[m.sender].potion += 2
        global.db.data.users[m.sender].lastclaim = new Date * 1
    } else {
        let buttons = `silahkan tunggu *⏱️${timers}* lagi untuk bisa mengclaim lagi`
        conn.sendBut(m.chat, buttons, wm2, 'Cooldown', '.cd', m) 
    }
}
handler.help = ['claim', 'daily']
handler.tags = ['rpg']
handler.command = /^(claim|daily)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.money = 0

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
