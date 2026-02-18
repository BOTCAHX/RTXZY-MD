const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted) return !0
    this.tebakkpop = this.tebakkpop ? this.tebakkpop : {}
    if (!(id in this.tebakkpop)) return !0
    if (m.quoted.id !== this.tebakkpop[id][0].key.id) return !0
    let json = this.tebakkpop[id][1]
    let jawaban = json.jawaban.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        global.db.data.users[m.sender].exp += this.tebakkpop[id][2]
        m.reply(`*Benar!*\n+${this.tebakkpop[id][2]} Kredit sosial`)
        clearTimeout(this.tebakkpop[id][3])
        delete this.tebakkpop[id]
    } 
    else if (similarity(teksUser, jawaban) >= threshold) {
        m.reply(`*Dikit Lagi!*`)
    } 
    else {
        m.reply(`*Salah!*`)
    }
    return !0
}

handler.exp = 0
module.exports = handler
