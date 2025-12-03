let handler = async (m, { conn, usedPrefix, text }) => {
  let who
  if (m.quoted) who = m.quoted.sender
  else if (m.mentionedJid?.[0]) who = m.mentionedJid[0]
  else if (text) {
    let num = text.replace(/[^0-9]/g, '')
    if (num.length > 5 && num.length < 20) who = num + '@s.whatsapp.net'
  }

  if (!who) return conn.reply(m.chat, `Tag atau reply orang yang ingin ditembak!\nContoh: ${usedPrefix}tembak @tag`, m)

  if (who === m.sender) return conn.reply(m.chat, `Tidak bisa menembak diri sendiri!`, m)

  let user = global.db.data.users[who]
  let sender = global.db.data.users[m.sender]

  if (!user) return conn.reply(m.chat, `Target tidak terdaftar di database`, m)

  const format = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (sender.pasangan && sender.pasangan !== who && global.db.data.users[sender.pasangan]?.pasangan === m.sender) {
    let denda = Math.ceil(sender.exp / 1000 * 20)
    sender.exp -= denda
    return conn.reply(m.chat, `Kamu sudah punya pasangan @${sender.pasangan.split('@')[0]}!\nPutus dulu dengan ${usedPrefix}putus @tag\nDenda selingkuh: ${format(denda)} exp`, m, { mentions: [sender.pasangan] })
  }

  if (user.pasangan && user.pasangan !== m.sender && global.db.data.users[user.pasangan]?.pasangan === who) {
    let denda = Math.ceil(sender.exp / 1000 * 10)
    sender.exp -= denda
    return conn.reply(m.chat, `Dia sudah punya pasangan @${user.pasangan.split('@')[0]}!\nDenda ngege: ${format(denda)} exp`, m, { mentions: [user.pasangan] })
  }

  if (user.pasangan === m.sender) {
    sender.pasangan = who
    user.pasangan = m.sender
    return conn.reply(m.chat, `Selamat! @${m.sender.split('@')[0]} & @${who.split('@')[0]} resmi pacaran!\nSemoga langgeng`, m, { mentions: [m.sender, who] })
  }

  sender.pasangan = who
  conn.reply(m.chat, `@${who.split('@')[0]} kamu ditembak @${m.sender.split('@')[0]}!\n\nKetik *${usedPrefix}terima @${m.sender.split('@')[0]}* untuk menerima\nKetik *${usedPrefix}tolak @${m.sender.split('@')[0]}* untuk menolak`, m, { mentions: [who, m.sender] })
}

handler.help = ['tembak @tag']
handler.tags = ['fun']
handler.command = /^(tembak)$/i
handler.group = true

module.exports = handler