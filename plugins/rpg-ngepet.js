let handler = async (m, { conn, args, usedPrefix }) => {
  try {
    global.DATABASE.data.users[m.sender].lastngepet = global.db.data.users[m.sender].lastngepet || 0
    let randomaku = `${Math.floor(Math.random() * 150)}`.trim()
    let randomkamu = `${Math.floor(Math.random() * 20)}`.trim() // Increased chances of failure
    let Aku = (randomaku * 1)
    let Kamu = (randomkamu * 1)
    let temout = 'https://telegra.ph/file/d9fdd23790ab42280ca30.jpg'
    let kngepet = 'https://telegra.ph/file/eff11a638fed2a3260b8f.jpg'
    let mngepet = 'https://telegra.ph/file/a1410ce010b59486bc122.jpg'
    
    let botol = global.wm
    
    let __timers = (new Date - global.db.data.users[m.sender].lastngepet)
    let _timers = (18000000 - __timers) 
    let timers = clockString(_timers)
    let user = global.db.data.users[m.sender]
    if (new Date - global.db.data.users[m.sender].lastngepet > 18000000) { // Changed to 5 hours
      if (Aku > Kamu) {
        conn.sendMessage(m.chat, {
          text: `Kamu lengah Saat Ngepet, Dan Kamu Mines -10 juta`,
          contextInfo: {
            externalAdReply: {
              title: 'Nooo, Kamu sekarang memiliki hutang 10JT 😞',
              body: wm,
              thumbnailUrl: 'https://telegra.ph/file/c6c4a6946a354317fe970.jpg',
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true
            }
          }
        })
        user.money -= 10000000 // Penalty for failed robbery is -20 million
        global.db.data.users[m.sender].lastngepet = new Date * 1
      } else if (Aku < Kamu) {
        user.money += 5000000 // Reward for successful robbery is 10 million
        conn.sendMessage(m.chat, {
          text: `Kamu berhasil Ngepet, Dan kamu mendapatkan 5 Juta rupiah`,
          contextInfo: {
            externalAdReply: {
              title: 'Selamat Telah Mendapatkan 5JT',
              body: wm,
              thumbnailUrl: 'https://telegra.ph/file/6a6a440d7f123bed78263.jpg',
              mediaType: 1,
              showAdAttribution: true,
              renderLargerThumbnail: true
            }
          }
        })
        global.db.data.users[m.sender].lastngepet = new Date * 1
      } else {
        conn.sendMessage(m.chat, `Maaf kamu tidak mendapatkan *Duit* dan kamu tidak masuk Dunia Lain karna melarikan diri\n${botol}`, m)
        global.db.data.users[m.sender].lastngepet = new Date * 1
      }
    } else conn.sendMessage(m.chat, {
      text: `Kamu sudah melakukan *ngepet*\nDan kamu harus menunggu selama agar bisa ngepet kembali ${timers}`,
      contextInfo: {
        externalAdReply: {
          title: 'C O O L D O W N',
          body: `${timers}`,
          thumbnailUrl: 'https://telegra.ph/file/295949ff5494f3038f48c.jpg',
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true
        }
      }
    })
  } catch (e) {
    throw `${e}`
  }
}

handler.help = ['ngepet']
handler.tags = ['rpg']
handler.command = /^(ngepet|ngefet)$/i
handler.premium = true
handler.group = true

handler.fail = null

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}