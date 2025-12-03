let poin = 10000
const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*tml/i.test(m.quoted.text)) return !0
    this.tebakml = this.tebakml ? this.tebakml : {}
    if (!(id in this.tebakml)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.tebakml[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.tebakml[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakml[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.tebakml[id][2]} money`)
            clearTimeout(this.tebakml[id][3])
            delete this.tebakml[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler