let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tpc/i.test(m.quoted.text)) return !0
    this.tebaktempat = this.tebaktempat ? this.tebaktempat : {}
    if (!(id in this.tebaktempat)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebaktempat[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.tebaktempat[id][1]))
        let answerIndex = ['a', 'b', 'c', 'd'].indexOf(m.text.toLowerCase())
        if (json.pilihan[answerIndex] && json.pilihan[answerIndex].toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaktempat[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.tebaktempat[id][2]} money\n\n${json.deskripsi}`)
            clearTimeout(this.tebaktempat[id][3])
            delete this.tebaktempat[id]
        } else if (similarity(json.pilihan[answerIndex].toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
