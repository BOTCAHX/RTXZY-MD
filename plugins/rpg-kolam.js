let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
	if (!db.data.chats[m.chat].rpg && m.isGroup) throw 'Feature Rpg Dimatikan Di grup ini\nKetik *!on* *rpg* untuk mengaktifkan fitur'

let name = global.db.data.users[m.sender].name
let level = global.db.data.users[m.sender].level
let exp = global.db.data.users[m.sender].exp
let paus = global.db.data.users[m.sender].paus
let kepiting = global.db.data.users[m.sender].kepiting
let gurita = global.db.data.users[m.sender].gurita
let cumi = global.db.data.users[m.sender].cumi
let buntal = global.db.data.users[m.sender].buntal
let dory = global.db.data.users[m.sender].dory
let lumba = global.db.data.users[m.sender].lumba
let lobster = global.db.data.users[m.sender].lobster
let hiu = global.db.data.users[m.sender].hiu
let udang = global.db.data.users[m.sender].udang
let ikan = global.db.data.users[m.sender].ikan
let orca = global.db.data.users[m.sender].orca
let past = `*—「 KOLAM 🏝️ 」—*
  
*💌 Name :* ${name}
*📊 Level :* ${level}
*✨ Exp :* ${exp}

✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✧
🐳 Paus: *${paus}*   
🦀 Kepiting: *${kepiting}*   
🐙 Gurita: *${gurita}*   
🦑 Cumi: *${cumi}*   
🐡 Buntal: *${buntal}*  
🐠 Dory: *${dory}*
🐬 Lumba: *${lumba}*
🦞 Lobster: *${lobster}*
🦈 Hiu: *${hiu}*
🦐 Udang: *${udang}*
🐟 Ikan: *${ikan}*
🐋 Orca: *${orca}*
✧━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━✧
🎏 Total Isi: *${paus + kepiting + gurita + cumi + buntal + dory + lumba + lobster + hiu + udang + ikan + orca}* Jenis`
let isi = ` *🦀Kepiting = ${kepiting}*
*🐠Dory = ${dory}*
*🦞Lobster = ${lobster}*
*🐟Ikan = ${ikan}*
*🦐Udang = ${udang}*
*🐬Lumba² = ${lumba}*
*🦑Cumi² = ${cumi}*
*🐋Paus = ${paus}*
*🐙Gurita = ${gurita}*
*🦈Hiu = ${hiu}*
*🐡Buntal = ${buntal}*
*🐳Orca = ${orca}*`.trim()
  conn.sendBut(m.chat, past, `${wm}`, 'Pasar', '#pasar', m)
  }
  handler.help = ['kotakikan', 'kolam', 'kolamikan']
  handler.tags = ['rpg']
  handler.command = /^(kotak(ikan)?|kolam(ikan)?)$/i
module.exports = handler
handler.register = true
let wm = global.wm

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
