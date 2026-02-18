const similarity = require('similarity')
const threshold = 0.72
let poin = 10000

let handler = m => m

handler.before = async function (m) {
    if (!m.quoted) return !0
    let id = m.chat
    this.siapakahaku = this.siapakahaku ? this.siapakahaku : {}
    if (!(id in this.siapakahaku)) return !0
    if (m.quoted.id !== this.siapakahaku[id][0].key.id) return !0
    let users = global.db.data.users[m.sender]
    let json = this.siapakahaku[id][1]
    let jawaban = json.jawaban.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        users.exp += this.siapakahaku[id][2]
        users.money += poin

        m.reply(`*Benar!*\n+${poin} Money`)
        clearTimeout(this.siapakahaku[id][3])
        delete this.siapakahaku[id]
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
