let poin = 10000

let similarity = require('similarity')
const threshold = 0.72
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*lag/i.test(m.quoted.text) || /.*lag/i.test(m.text))
        return !0
    this.tebaklagu = this.tebaklagu ? this.tebaklagu : {}
    if (!(id in this.tebaklagu))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.tebaklagu[id][0].key.id) {
        let json = JSON.parse(JSON.stringify(this.tebaklagu[id][1]))
        // m.reply(JSON.stringify(json, null, '\t'))
        if (m.text.toLowerCase() == json.judul.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebaklagu[id][2]
            users.money += poin
            this.reply(m.chat, `*Benar!*\n+${this.tebaklagu[id][2]} money`, m)
            clearTimeout(this.tebaklagu[id][3])
            delete this.tebaklagu[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold)
            m.reply(`*Dikit Lagi!*`)
        else
            this.reply(m.chat, `*Salah!*`, m)
    }
    return !0
}
handler.exp = 0

module.exports = handler;