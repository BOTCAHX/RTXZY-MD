let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*kpp/i.test(m.quoted.text)) return !0
  this.tebakkpop = this.tebakkpop ? this.tebakkpop : {}
  if (!(id in this.tebakkpop)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == this.tebakkpop[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(this.tebakkpop[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakkpop[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.money += poin
      m.reply(`*Benar!*\n+${this.tebakkpop[id][2]} money`)
      clearTimeout(this.tebakkpop[id][3])
      delete this.tebakkpop[id]
    } else if ((m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler