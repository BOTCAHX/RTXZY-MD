let handler = async (m, { conn, args, usedPrefix, command }) => {
  const normalize = (jid = '') => jid.replace(/:\d+@/, '@')

  let target = normalize(m.mentionedJid?.[0] || m.sender)

  if (!global.db.data.users[target]) {
    global.db.data.users[target] = {
      name: '',
      exp: 0,
      limit: 0,
      money: 0,
      bank: 0,
      level: 0,
      role: 'Newbie'
    }
  }

  let user = global.db.data.users[target]

  let name    = user.name || target.split('@')[0]
  let exp     = user.exp     ?? 0
  let limit   = user.limit   ?? 0
  let balance = user.money   ?? 0
  let atm     = user.bank    ?? 0
  let level   = user.level   ?? 0
  let role    = user.role    ?? 'Newbie'

  let capt  = `乂  *🏦 B A N K - U S E R 🏦*  乂\n\n`
  capt += `  ◦  *👤 Nama* : ${name}\n`
  capt += `  ◦  *⭐ Role* : ${role}\n`
  capt += `  ◦  *✨ Exp* : ${exp}\n`
  capt += `  ◦  *📊 Limit* : ${limit}\n`
  capt += `  ◦  *💰 Saldo* : ${balance}\n`
  capt += `  ◦  *📈 Level* : ${level}\n`
  capt += `  ◦  *🏧 ATM* : ${atm}\n\n`
  capt += `> *${usedPrefix} atm <jumlah>* untuk menabung\n`
  capt += `> *${usedPrefix} pull <jumlah>* untuk menarik uang\n`

  await conn.sendMessage(
    m.chat,
    {
      image: { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIiXrZfzbrdryj4p1M69g0gLTVE7RR00k6kXSu4vPz12R5MhFQ-vhHjKE&s' },
      caption: capt,
      mentions: [m.sender]
    },
    { quoted: m }
  )
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = /^bank$/i
handler.rpg = true

export default handler
