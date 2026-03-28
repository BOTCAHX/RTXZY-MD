let handler = m => m

handler.before = async function (m) {
  if (!m.quoted) return !0

  this.math = this.math ? this.math : {}
  let id = m.chat
  if (!(id in this.math)) return !0
  if (m.quoted.id !== this.math[id][0].key.id) return !0

  let users = global.db.data.users[m.sender]
  let math = this.math[id][1]

  let input = (m.text || '').toLowerCase().trim()
  let index = ['a', 'b', 'c', 'd'].indexOf(input)
  if (index === -1) return !0

  let pilihanUser = math.pilihan[index]
  let jawabanAsli = math.jawabanAsli.toString().toLowerCase().trim()

  if (!pilihanUser) return !0
  if (pilihanUser.toString().toLowerCase() === jawabanAsli) {
    users.exp += math.bonus
    users.money += math.money

    clearTimeout(this.math[id][3])
    delete this.math[id]

    m.reply(`🎉 *Jawaban Benar!* 🎉

+${math.bonus} XP
+${math.money} Money`)
  } 
  else {
    this.math[id][2]--

    if (this.math[id][2] <= 0) {
      clearTimeout(this.math[id][3])
      delete this.math[id]

      m.reply(`😥 *Kesempatan habis!*Jawaban: *${math.jawaban} (${math.jawabanAsli})*`)
    } else {
      m.reply(`❌ *Salah!* Sisa kesempatan: ${this.math[id][2]}`)
    }
  }

  return !0
}

module.exports = handler