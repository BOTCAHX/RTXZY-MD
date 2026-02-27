let handler = async (m, { conn, args, usedPrefix, command }) => {
  let target = m.mentionedJid[0] || m.sender 
  let user = global.db.data.users[target]
  
  let name = user.name
  let exp = user.exp
  let limit = user.limit
  let balance = user.money
  let atm = user.bank
  let level = user.level
  let role = user.role

  let capt = `乂  *🏦 B A N K - U S E R 🏦*  乂\n\n`
  capt += `  ◦  *👤 Nama* : ${name}\n`
  capt += `  ◦  *⭐ Role* : ${role}\n`
  capt += `  ◦  *✨ Exp* : ${exp}\n`
  capt += `  ◦  *📊 Limit* : ${limit}\n`
  capt += `  ◦  *💰 Saldo* : ${balance}\n`
  capt += `  ◦  *📈 Level* : ${level}\n`
  capt += `  ◦  *🏧 ATM* : ${atm}\n\n`
  capt += `> *${usedPrefix} atm <jumlah>* untuk menabung\n`
  capt += `> *${usedPrefix} pull <jumlah>* untuk menarik uang\n`

  await conn.relayMessage(m.chat, {
            extendedTextMessage:{
                text: capt, 
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIiXrZfzbrdryj4p1M69g0gLTVE7RR00k6kXSu4vPz12R5MhFQ-vhHjKE&s',
                        sourceUrl: ''
                    }
                }, 
                mentions: [m.sender]
            }
        }, {})
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^bank$/
handler.rpg = true

module.exports = handler
