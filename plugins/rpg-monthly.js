let { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn }) => {
    let wm = global.wm
    let user = global.db.data.users[m.sender]
    let _timers = (2592000000 - (new Date - user.lastmonthly))
    let timers = clockString(_timers) 
    if (new Date - user.lastmonthly > 2592000000) {
    let yeg = 'https://telegra.ph/file/8d14cfb9b91bee2db8239.jpg'
    let str = `+10000 money 💹\n+5 Legendary crate 🧰\n+3 Pet crate 📫\n+7 Iron ⛓\n+2 gold 🪙\n+7 string 🕸\n+10 kayu 🪵`
        conn.send2ButtonImg(m.chat, yeg, str, wm2, 'Claim', '.claim', 'Weekly', '.weekly',m)
        conn.reply(str)
        user.money += 100000
        user.legendary += 5
        user.string += 7
        user.kayu += 10
        user.iron += 7
        user.gold += 2
        user.pet += 3
        user.lastmonthly = new Date * 1
    } else {
        let cede = `silahkan tunggu *🕒${timers}* lagi untuk bisa mengclaim lagi`
        conn.reply(m.chat, cede, m) 
    }
}
handler.help = ['monthly']
handler.tags = ['rpg']
handler.command = /^(monthly)$/i

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

let botol = global.wm

function button(teks, user) {
    const buttons = []
    
    let claim = new Date - user.lastclaim > 86400000
    let monthly = new Date - user.lastmonthly > 2592000000
    let weekly = new Date - user.lastweekly > 604800000
    console.log({claim, monthly, weekly})
    
    if (monthly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/monthly'}, type: 1})
    if (weekly) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/weekly'}, type: 1})
    if (claim) buttons.push({buttonId: `id${buttons.length + 1}`, buttonText: {displayText: '/claim'}, type: 1})
    if (buttons.length == 0) throw teks
}
