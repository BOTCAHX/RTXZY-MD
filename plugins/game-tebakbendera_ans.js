let poin = 10000
const similarity = require('similarity')
const threshold = 0.72

let handler = m => m
handler.before = async function (m) {
    if (!m.quoted) return !0
    let id = m.chat
    this.tebakbendera2 = this.tebakbendera2 ? this.tebakbendera2 : {}
    if (!(id in this.tebakbendera2)) return !0
    if (m.quoted.id !== this.tebakbendera2[id][0].key.id) return !0
    let users = global.db.data.users[m.sender]
    let json = this.tebakbendera2[id][1]
    let jawaban = json.nama.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        users.exp += this.tebakbendera2[id][2]
        users.money += poin
        m.reply(`*Benar!*\n+${poin} Money`)
        clearTimeout(this.tebakbendera2[id][3])
        delete this.tebakbendera2[id]
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
