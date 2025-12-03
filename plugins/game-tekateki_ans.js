let poin = 10000

const similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/TEKA TEKI/i.test(m.quoted.text)) return !0
    this.tekateki = this.tekateki ? this.tekateki : {}
    if (!(id in this.tekateki)) return m.reply('Soal itu telah berakhir')
    // if (m.quoted.id == this.tekateki[id][0].key.id) {
    let json = JSON.parse(JSON.stringify(this.tekateki[id][1]))
    if (/^(.tete|bantuan|^$)/i.test(m.text)) return !0
    if (m.text.toLowerCase() == json.data.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.tekateki[id][2]
        users.money += poin
        await this.reply(m.chat, `*Benar!* +${this.tekateki[id][2]}money`, m)
        this.sendMessage(m.chat, { delete: this.tekateki[id][0].key }).catch(e => e)
        clearTimeout(this.tekateki[id][3])
        delete this.tekateki[id]
    } else if (similarity(m.text.toLowerCase(), json.data.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*Dikit Lagi!*`)
    else m.reply(`*Salah!*`)
    // }
    return !0
}
handler.exp = 0

module.exports = handler