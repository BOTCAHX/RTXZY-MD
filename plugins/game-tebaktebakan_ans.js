const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted) return !0
    this.tebaktebakan = this.tebaktebakan ? this.tebaktebakan : {}
    if (!(id in this.tebaktebakan)) return !0
    if (m.quoted.id !== this.tebaktebakan[id][0].key.id) return !0
    let json = this.tebaktebakan[id][1]
    let jawaban = json.jawaban.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === jawaban) {
        global.db.data.users[m.sender].exp += this.tebaktebakan[id][2]
        m.reply(`*Benar!*\n+${this.tebaktebakan[id][2]} Kredit sosial`)
        clearTimeout(this.tebaktebakan[id][3])
        delete this.tebaktebakan[id]
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
