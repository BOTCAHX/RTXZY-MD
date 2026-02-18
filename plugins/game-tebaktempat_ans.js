let poin = 10000
const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    if (!m.quoted) return !0
    let id = m.chat
    this.tebaktempat = this.tebaktempat ? this.tebaktempat : {}
    if (!(id in this.tebaktempat)) return !0
    if (m.quoted.id !== this.tebaktempat[id][0].key.id) return !0
    let users = global.db.data.users[m.sender]
    let json = this.tebaktempat[id][1]

    let input = (m.text || '').toLowerCase().trim()
    let answerIndex = ['a', 'b', 'c', 'd'].indexOf(input)
    if (answerIndex === -1) return !0 
    let pilihanUser = json.pilihan[answerIndex]
    let jawaban = json.jawaban.toLowerCase().trim()
    if (!pilihanUser) return !0
    if (pilihanUser.toLowerCase() === jawaban) {
        users.exp += this.tebaktempat[id][2]
        users.money += poin
        m.reply(`*Benar!*\n+${poin} Money\n\n${json.deskripsi}`)
        clearTimeout(this.tebaktempat[id][3])
        delete this.tebaktempat[id]
    } 
    else if (similarity(pilihanUser.toLowerCase(), jawaban) >= threshold) {
        m.reply(`*Dikit Lagi!*`)
    } 
    else {
        m.reply(`*Salah!*`)
    }
    return !0
}

handler.exp = 0
module.exports = handler

