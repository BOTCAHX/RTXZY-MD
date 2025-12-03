let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tsa/i.test(m.quoted.text)) return !0
    this.tebakislami = this.tebakislami ? this.tebakislami : {}
    if (!(id in this.tebakislami)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakislami[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.tebakislami[id][1]))
        let answerIndex = ['a', 'b', 'c', 'd'].indexOf(m.text.toLowerCase())
        if (json.pilihan[answerIndex] && json.pilihan[answerIndex].toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakislami[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.tebakislami[id][2]} money\n\n${json.deskripsi}`)
            clearTimeout(this.tebakislami[id][3])
            delete this.tebakislami[id]
        } else if (similarity(json.pilihan[answerIndex].toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler
