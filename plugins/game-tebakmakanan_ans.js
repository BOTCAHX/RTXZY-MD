let poin = 10000

const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
  let id = m.chat
  let users = global.db.data.users[m.sender]
  if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tebma/i.test(m.quoted.text)) return !0
  this.tebakmakanan = this.tebakmakanan ? this.tebakmakanan : {}
  if (!(id in this.tebakmakanan)) return m.reply('Soal itu telah berakhir')
  if (m.quoted.id == this.tebakmakanan[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(this.tebakmakanan[id][1]))
    // m.reply(JSON.stringify(json, null, '\t'))
    if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
      global.db.data.users[m.sender].exp += this.tebakmakanan[id][2]
      global.db.data.users[m.sender].tiketcoin += 1
      users.money += poin
      m.reply(`*Benar!*\n+${this.tebakmakanan[id][2]} money`)
      clearTimeout(this.tebakmakanan[id][3])
      delete this.tebakmakanan[id]
    } else if ((m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
  }
  return !0
}
handler.exp = 0

module.exports = handler