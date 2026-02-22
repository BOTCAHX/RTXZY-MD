const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted) return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu)) return !0
    if (m.quoted.id !== this.tebaklagu[id][0].key.id) return !0
    let json = this.tebaklagu[id][1]
    let judul = json.judul.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0
    if (teksUser === judul) {
        global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
        m.reply(`*Benar!*\n+${this.tebaklagu[id][2]} Kredit sosial`)
        clearTimeout(this.tebaklagu[id][3])
        delete this.tebaklagu[id]
    } 
    else if (similarity(teksUser, judul) >= threshold) {
        m.reply(`*Dikit Lagi!*`)
    } 
    else {
        m.reply(`*Salah!*`)
    }
    return !0
}

handler.exp = 0
module.exports = handler
