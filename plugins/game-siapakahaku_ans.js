const similarity = require('similarity')
const threshold = 0.72
let poin = 10000
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*maka/i.test(m.quoted.text)) return !0
    this.siapakahaku = this.siapakahaku ? this.siapakahaku : {}
    if (!(id in this.siapakahaku)) return m.reply('Soal itu telah berakhir')
    if (m.quoted.id == this.siapakahaku[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.siapakahaku[id][1]))
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.siapakahaku[id][2]
            users.money += poin
            m.reply(`*Benar!*\n+${this.siapakahaku[id][2]} money`)
            clearTimeout(this.siapakahaku[id][3])
            delete this.siapakahaku[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
        else m.reply(`*Salah!*`)
    }
    return !0
}
handler.exp = 0

module.exports = handler