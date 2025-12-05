let handler = async (m, { conn, text, usedPrefix }) => {
  let who
  if (m.isGroup) {
    if (!m.mentionedJid[0] && !text.includes('|')) return conn.reply(m.chat, `Tag orangnya atau ketik nomor!\n\n*Contoh:*\n${usedPrefix}addprem @tag|30\n${usedPrefix}addprem 628234567890|30`, m)
    who = m.mentionedJid[0] || (text.split('|')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  } else {
    if (!text.includes('|')) return conn.reply(m.chat, `Format salah!\n\n*Contoh:*\n${usedPrefix}addprem 628234567890|30`, m)
    who = text.split('|')[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net'
  }

  let days = parseInt(text.split('|')[1])
  if (!days || days < 1) return conn.reply(m.chat, `Masukkan jumlah hari!\n\n*Contoh:*\n${usedPrefix}addprem @tag|30\n${usedPrefix}addprem 628234567890|30`, m)

  if (!global.db.data.users[who]) {
    global.db.data.users[who] = {
      exp: 0,
      limit: 10,
      lastclaim: 0,
      registered: false,
      name: conn.getName(who),
      age: -1,
      regTime: -1,
      premium: false,
      premiumTime: 0,
      banned: false,
      level: 0,
      money: 0,
      pasangan: '',
      role: 'Newbie'
    }
  }

  let waktu = 86400000 * days
  let now = Date.now()

  global.db.data.users[who].premium = true
  global.db.data.users[who].premiumTime = (global.db.data.users[who].premiumTime || now) + waktu

  let nama = `@${who.split('@')[0]}`
  let teks = `*PREMIUM BERHASIL DITAMBAHKAN*

${nama} sekarang menjadi user *Premium* selama *${days} hari*

Sisa premium: ${msToDate(global.db.data.users[who].premiumTime - now)}`

  conn.reply(m.chat, teks, m, { mentions: [who] })
  conn.reply(who, `*KAMU JADI PREMIUM!*

Selamat! Akses premium kamu aktif selama *${days} hari*.

Nikmati fitur tanpa batas!`, m)
}

handler.help = ['addprem @tag|hari', 'addprem 628xxx|hari']
handler.tags = ['owner']
handler.command = /^(addprem|prem|tambahprem)$/i
handler.owner = true

module.exports = handler

function msToDate(ms) {
  let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000)
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  return [d, ' hari ', h, ' jam ', m, ' menit'].map(v => v.toString().padStart(2, 0)).join('')
}
