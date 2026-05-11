let handler = async (m, { conn }) => {
  let __timers = (new Date - global.db.data.users[m.sender].lastnambang)
  let _timers = (300000 - __timers)
  let timers = clockString(_timers) 
  let name = await conn.getName(m.sender)
  let user = global.db.data.users[m.sender]
  
  if (new Date - global.db.data.users[m.sender].lastnambang > 300000) {
      user.lastnambang = new Date * 1

      let randomaku1 = `${Math.floor(Math.random() * 10)}`
      let randomaku2 = `${Math.floor(Math.random() * 10)}`
      let randomaku4 = `${Math.floor(Math.random() * 5)}`
      let randomaku3 = `${Math.floor(Math.random() * 10)}`
      let randomaku5 = `${Math.floor(Math.random() * 10)}`

      .trim()

      let rbrb1 = (randomaku1 * 2)
      let rbrb2 = (randomaku2 * 1) 
      let rbrb3 = (randomaku3 * 1)
      let rbrb4 = (randomaku4 * 15768)
      let rbrb5 = (randomaku5 * 1)

      var zero1 = `${rbrb1}`
      var zero2 = `${rbrb2}`
      var zero3 = `${rbrb3}`
      var zero4 = `${rbrb4}`
      var zero5 = `${rbrb5}`

      let arr = [
          `mencari lebih dalam...`, 
          `⛏️⛏️🪨💎🪨🪨🪨🪨🪨
          🪨⬜⬜⬜🪨⬜⬜⬜🪨🪨
          🪨🪨🪨🪨🪨🪨🪨🪨🪨🪨
          🪨🪨🪨⛏️⛏️🪙  🪙 🪨       \n\n\n➕ mulai menambang....`, 
          `🪨🪨🪨🪨🪨🪨🪨🪨🪨
          💎⛏️⛏️🪨🪨⬜⬜⬜🪨🪨
          🪨🪨🪨🪨🪨🪨🪨⛏️🪨🪨
          🪨🪨⛏️⛏️🪙  🪙 🪨       \n\n\n➕ kamu di tambang...`, 
          `➕ 💹Mendapatkan hasil tambang....`, 
          `*—[ Hasil nambang kamu ${name} ]—*
          ➕ 🪨 coal = [ ${zero5} ]
          ➕ ✨ emas = [ ${zero4} ] 	
          ➕ ✨ diamond = [ ${zero3} ] 		 
          ${wm}`
      ]

      let { key } = await conn.sendMessage(m.chat, {text: 'mencari tempat nambang.....'})
      for (let i = 0; i < arr.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 10000));
          await conn.sendMessage(m.chat, { text: arr[i], edit: key });
      }

      global.db.data.users[m.sender].coal += rbrb5
      global.db.data.users[m.sender].emas += rbrb4 
      global.db.data.users[m.sender].diamond += rbrb3
      global.db.data.users[m.sender].tiketcoin += 1

  } else m.reply(`Sepertinya anda sudah kecapekan dari tambang... silahkan istirahat dulu sekitar\n*${timers}*`)
}
handler.help = ['nambang']
handler.tags = ['rpg']
handler.command = /^(nambang)$/i
handler.register = true
handler.rpg = true
module.exports = handler

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  console.log({ms,h,m,s})
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}