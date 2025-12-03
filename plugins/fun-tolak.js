let handler = async (m, { conn }) => {
  let who
  if (m.quoted) who = m.quoted.sender
  else if (m.mentionedJid?.[0]) who = m.mentionedJid[0]

  if (!who) return conn.reply(m.chat, `Tag atau reply orang yang nembak kamu!`, m)

  if (who === m.sender) return conn.reply(m.chat, `Gak masuk akal`, m)
  if (who === conn.user.jid) return conn.reply(m.chat, `Bot gak punya hati buat ditolak`, m)

  let user = global.db.data.users[who]
  let sender = global.db.data.users[m.sender]

  if (!user) return conn.reply(m.chat, `Dia tidak terdaftar di database`, m)

  if (user.pasangan !== m.sender) {
    return conn.reply(m.chat, `Maaf @${who.split('@')[0]} tidak sedang menembakmu`, m, { mentions: [who] })
  }

  user.pasangan = ""
  sender.pasangan = ""

  conn.reply(m.chat, `@${m.sender.split('@')[0]} menolak @${who.split('@')[0]}\n\nKasian banget sih :v`, m, { mentions: [m.sender, who] })
}

handler.help = ['tolak @tag']
handler.tags = ['fun']
handler.command = /^(tolak)$/i
handler.group = true
module.exports = handler