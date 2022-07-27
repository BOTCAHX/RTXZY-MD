let handler = m => m
handler.before = m => {
  let user = global.db.data.users[m.sender]
  if (user.afk > -1) {
    let test = `
╭──[ *BERHENTI AFK !* ]──✧
┆ *Alasan* : ${user.afkReason ? '' + user.afkReason : ''}
┆ *Time* : ${clockString(new Date - user.afk)}
╰┅────★
`.trim()
conn.sendButton(m.chat, test, wm, '⋮☰ Menu', '.menu', m)
conn.reply(test)
    user.afk = -1
    user.afkReason = ''
  }
  let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
  for (let jid of jids) {
    let user = global.db.data.users[jid]
    if (!user) continue
    let afkTime = user.afk
    if (!afkTime || afkTime < 0) continue
    let reason = user.afkReason || ''
    let str = `╭──[ *JANGAN TAG DIA!* ]──✧
┆ ${reason ? '*Alasan* : ' + reason : 'Tanpa Alasan'}
┆ *Time* : ${clockString(new Date - afkTime)}
╰┅────★
`.trim()
conn.sendButton(m.chat, str, `${wm}`,'Okiee', 'okeh',m)
conn.reply(str)
  }
  return true
}

module.exports = handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0) ).join(':')
}

let wm = global.wm