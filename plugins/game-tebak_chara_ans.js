const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted) return !0
    this.tebakchara = this.tebakchara ? this.tebakchara : {}
    if (!(id in this.tebakchara)) return !0
    if (m.quoted.id !== this.tebakchara[id][0].key.id) return !0
    let json = this.tebakchara[id][1]
    let jawaban = json.result.name.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        global.db.data.users[m.sender].money += this.tebakchara[id][2]
        m.reply(`*Benar!*\n+${this.tebakchara[id][2]} Kredit sosial`)
        clearTimeout(this.tebakchara[id][3])
        delete this.tebakchara[id]
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
