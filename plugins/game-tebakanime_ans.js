let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik .tbam/i.test(m.quoted.text)) return !0
  this.tebakanime = this.tebakanime ? this.tebakanime : {}
  if (!(id in this.tebakanime)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == this.tebakanime[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(this.tebakanime[id][1]))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakanime[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.money += poin
      m.reply(`*Benar!*\n+${this.tebakanime[id][2]} money`)
      clearTimeout(this.tebakanime[id][3])
      delete this.tebakanime[id]
    } else if ((m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler