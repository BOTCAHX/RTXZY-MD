let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*kmi/i.test(m.quoted.text)) return !0
    this.kimia = this.kimia ? this.kimia : {}
    if (!(id in this.kimia)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.kimia[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.kimia[id][1]))
        if (m.text.toLowerCase() == json.lambang.toLowerCase().trim()) {
            users.money += poin
            global.db.data.users[m.sender].exp += this.kimia[id][2]
            m.reply(`*Benar!*\n+${this.kimia[id][2]} money`)
            clearTimeout(this.kimia[id][3])
            delete this.kimia[id]
        } else if (similarity(m.text.toLowerCase(), json.lambang.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler