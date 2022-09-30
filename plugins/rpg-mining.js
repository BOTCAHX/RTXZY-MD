let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let __timers = (new Date - user.lastmining)
    let _timers = (300000 - __timers)
    let timers = clockString(_timers) 
    let botol = global.botwm
    let minim = `${Math.floor(Math.random() * 3)}`.trim() 
    let minam = `${Math.floor(Math.random() * 5)}`.trim() 
    let minkm = `${Math.floor(Math.random() * 10)}`.trim() 

   if ( user.pickaxe > 0 ) {
    if (new Date - user.lastmining > 3000000) {

      user.emas += minim * 1
      user.iron += minam * 1
      user.string += minkm * 1
      user.lastmining = new Date * 1
            
    m.reply(`Kamu Menambang Di ${pickRandom(['⛰️Lembah', '⛰️Goa mletre', '🏞️Sungai Selandia', '⛰️Goa texas', '...'])}\n*⚒️Hasil Tambang:* 🪙Emas: *${minim}*\n⛓️Besi: *${minam}*\n🕸️String: *${minkm}*`)
      } else conn.sendBut( m.chat, `Tunggu 🕓${timers} lagi, untuk menambang`, `${botol}`, `⋮☰ Back`, `.menu`, m)
    } else conn.sendBut( m.chat, `Kamu Tidak Mempunyai *⛏️Pickaxe* untuk menambang\nBuat Lah Pickaxe menggunakan string kayu dan batu!`, `${wm}`, `Craft Pickaxe`, `.craft pickaxe`,m )
  }

handler.help = ['mining']
handler.tags = ['rpg']
handler.command = /^mining/i

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

let wm = global.wm
