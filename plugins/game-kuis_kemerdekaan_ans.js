const similarity = require('similarity')
const threshold = 0.72
let poin = 10000
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*mka/i.test(m.quoted.text)) return !0
    this.merdeka = this.merdeka ? this.merdeka : {}
    if (!(id in this.merdeka)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.merdeka[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.merdeka[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.merdeka[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.merdeka[id][2]} money`)
            clearTimeout(this.merdeka[id][3])
            delete this.merdeka[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler