const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*cek/i.test(m.quoted.contentText)) return !0
    this.tebaksholawat = this.tebaksholawat ? this.tebaksholawat : {}
    if (!(id in this.tebaksholawat)) return m.reply('Tebak Sholawat telah berakhir')
    if (m.quoted.id == this.tebaksholawat[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebaksholawat[id][1]))
        if (['.shola', 'Bantuan', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.judul.toLowerCase()) {
            db.data.users[m.sender].exp += this.tebaksholawat[id][2]
            await this.sendButton(m.chat, benar + ` +${this.tebaksholawat[id][2]} XP`, '© sekha', 'Tebak Sholawat', '.tebaksholawat', m)
            clearTimeout(this.tebaksholawat[id][3])
            delete this.tebaksholawat[id]
        } else if (similarity(m.text.toLowerCase(), json.judul.toLowerCase().trim()) >= threshold) m.reply(dikit)
        else m.reply(salah)
    }
    return !0
}

module.exports = handler
