let poin = 10000
const similarity = require('similarity')
const threshold = 0.72

let handler = m => m
handler.before = async function (m) {
    if (!m.quoted) return !0
    let id = m.chat
    this.kimia = this.kimia ? this.kimia : {}
    if (!(id in this.kimia)) return !0
    if (m.quoted.id !== this.kimia[id][0].key.id) return !0
    let users = global.db.data.users[m.sender]
    let json = this.kimia[id][1]
    let jawaban = json.lambang.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        users.money += poin
        users.exp += this.kimia[id][2]
        m.reply(`*Benar!*\n+${poin} Money`)
        clearTimeout(this.kimia[id][3])
        delete this.kimia[id]
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
