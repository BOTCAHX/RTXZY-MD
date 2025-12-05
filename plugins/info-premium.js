let handler = async (m, { conn, usedPrefix }) => {
  let who
  if (m.isGroup) {
    who = m.mentionedJid[0] || m.quoted?.sender || m.sender
  } else {
    who = m.sender
  }

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = {
      exp: 0, limit: 10, lastclaim: 0, registered: false, name: conn.getName(who),
      age: -1, regTime: -1, premium: false, premiumTime: 0, banned: false,
      level: 0, money: 0, pasangan: '', role: 'Newbie'
    }
  }

  let user = global.db.data.users[who]
  let nama = `@${who.split('@')[0]}`

  if (!user.premium) {
    return conn.reply(m.chat, `*${m.isGroup ? nama : 'Kamu'} bukan user Premium*`, m, { mentions: [who] })
  }

  let sisa = user.premiumTime - Date.now()
  let teks = `*CEK PREMIUM*

${m.isGroup ? nama : 'Kamu'} adalah user *Premium*

⏳ Masa aktif: ${msToDate(sisa)}
📅 Berakhir: ${new Date(user.premiumTime).toLocaleString('id-ID')}`

  conn.reply(m.chat, teks, m, { mentions: [who] })
}

handler.help = ['cekprem', 'cekpremium', 'premium']
handler.tags = ['info']
handler.command = /^(cekprem(ium)?|premium)$/i

module.exports = handler

function msToDate(ms) {
  if (ms <= 0) return 'Sudah habis'
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d ? `${d} hari` : '', h ? `${h} jam` : '', m ? `${m} menit` : '', s ? `${s} detik` : '']
    .filter(v => v).join(' ')
}
