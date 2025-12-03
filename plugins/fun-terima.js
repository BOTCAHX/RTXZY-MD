let handler = async (m, { conn, usedPrefix }) => {
  let who
  if (m.quoted) who = m.quoted.sender
  else if (m.mentionedJid?.[0]) who = m.mentionedJid[0]

  if (!who) return conn.reply(m.chat, `Tag atau reply orang yang menembakmu!`, m)

  if (who === m.sender) return conn.reply(m.chat, `Tidak masuk akal`, m)
  if (who === conn.user.jid) return conn.reply(m.chat, `Bot tidak bisa pacaran`, m)

  let user = global.db.data.users[who]
  let sender = global.db.data.users[m.sender]

  if (!user) return conn.reply(m.chat, `Dia tidak terdaftar di database`, m)

  if (user.pasangan !== m.sender) {
    return conn.reply(m.chat, `Maaf @${who.split('@')[0]} tidak sedang menembakmu`, m, { mentions: [who] })
  }

  user.pasangan = m.sender
  sender.pasangan = who

  conn.reply(m.chat, `Selamat! @${m.sender.split('@')[0]} & @${who.split('@')[0]} sekarang resmi pacaran!\n\nSemoga langgeng dan bahagia selalu`, m, { mentions: [m.sender, who] })
}

handler.help = ['terima @tag']
handler.tags = ['fun']
handler.command = /^(terima)$/i
handler.group = true
module.exports = handler