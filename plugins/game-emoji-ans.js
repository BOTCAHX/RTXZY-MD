let similarity = require('similarity')
const threshold = 0.72
let poin = 10000
let handler = m => m
handler.before = async function (m) {
    let id = m.chat
    let users = global.db.data.users[m.sender]
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text || !/Ketik.*hemo/i.test(m.quoted.text) || /.*hemo/i.test(m.text))
        return !0
    this.tebakemoji = this.tebakemoji ? this.tebakemoji : {}
    if (!(id in this.tebakemoji))
        return this.reply(m.chat, 'Soal itu telah berakhir', m)
    if (m.quoted.id == this.tebakemoji[id][0].key.id) {
        let isSurrender = /^((me)?nyerah|surr?ender)$/i.test(m.text)
        if (isSurrender) {
            clearTimeout(this.tebakemoji[id][3])
            delete this.tebakemoji[id]
            return this.reply(m.chat, '*Yah Menyerah :( !*', m)
        }
        let json = this.tebakemoji[id][1]
        if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
            global.db.data.users[m.sender].exp += this.tebakemoji[id][2]
            users.money += poin
            this.reply(m.chat, `✅ *Benar!*\n+${this.tebakemoji[id][2]} money`, m)
            clearTimeout(this.tebakemoji[id][3])
            delete this.tebakemoji[id]
        } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold)
            m.reply(`❗ *Dikit Lagi!*`)
        else
            this.reply(m.chat, `❌ *Salah!*`, m)
    }
    return !0
}
handler.exp = 0

module.exports = handler

//danaputra133