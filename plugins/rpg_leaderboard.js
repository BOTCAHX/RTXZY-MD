let handler = async (m, { conn, args, participants }) => {
  const cleanJid = (jid) => {
    if (!jid) return null
    const decoded = conn.decodeJid(String(jid))
    return decoded && decoded.endsWith('@s.whatsapp.net') ? decoded : null
  }

  let users = Object.entries(global.db.data.users)
    .map(([key, value]) => ({ ...value, jid: key }))
    .filter((u) => cleanJid(u.jid))
    .map((u) => ({ ...u, jid: cleanJid(u.jid) }))

  if (!users.length) return conn.reply(m.chat, 'Belum ada user terdaftar.', m)

  const sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  const sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  const sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  const sortedMoney = users.map(toNumber('money')).sort(sort('money'))
  const sortedBank = users.map(toNumber('bank')).sort(sort('bank'))

  const boards = [
    ['XP', 'exp', 'Exp', sortedExp],
    ['Limit', 'limit', 'Limit', sortedLim],
    ['Level', 'level', 'Level', sortedLevel],
    ['Money', 'money', 'Money', sortedMoney],
    ['Bank', 'bank', 'Bank', sortedBank],
  ]

  let len = Math.min(10, sortedExp.length)
  if (args[0] && /^\d+$/.test(args[0])) {
    len = Math.min(10, Math.max(parseInt(args[0]), 10))
    len = Math.min(len, sortedExp.length)
  }

  const rankOf = (sorted, jid) => {
    const idx = sorted.findIndex((u) => u.jid === jid)
    return idx === -1 ? 0 : idx + 1
  }

  const sender = conn.decodeJid(m.sender)
  const mentionSet = new Set()
  const participantSet = new Set((participants || []).map((p) => conn.toMentionJid(p.id)).filter(Boolean))

  const boardText = async (title, prop, label, sorted) => {
    const top = sorted.slice(0, len)
    const names = await Promise.all(top.map(({ jid }) => conn.getName(jid)))
    const lines = top.map(({ jid, [prop]: val }, i) => {
      const safe = conn.toMentionJid(jid)
      if (safe) mentionSet.add(safe)
      const num = (safe || jid).split('@')[0]
      const showName = !safe || participantSet.has(jid)
      return `${i + 1}. ${showName ? `(${names[i]}) wa.me/${num}` : `@${num}`} *${val} ${label}*`
    })
    return `• *${title} Leaderboard Top ${len}* •\nKamu: *${rankOf(sorted, sender)}* dari *${sorted.length}*\n\n${lines.join('\n')}`
  }

  const sections = await Promise.all(boards.map(([title, prop, label, sorted]) => boardText(title, prop, label, sorted)))
  const text = sections.join('\n\n').trim()

  conn.reply(m.chat, text, m, {
    contextInfo: {
      mentionedJid: [...mentionSet],
    },
  })
}

handler.help = ['leaderboard <jumlah user>']
handler.tags = ['info']
handler.command = /^(leaderboard|lb)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false
handler.rpg = true

handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return { ...b[i], [property]: a[property] === undefined ? _default : a[property] }
  }
  else return (a) => (a === undefined ? _default : a)
}
