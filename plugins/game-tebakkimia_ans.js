const similarity = require('similarity')
const threshold = 0.72

let handler = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/Ketik.*teki/i.test(m.quoted.contentText)) return !0
    this.tebakkimia = this.tebakkimia ? this.tebakkimia : {}
    if (!(id in this.tebakkimia)) return m.reply('Tebak Kimia telah berakhir')
    if (m.quoted.id == this.tebakkimia[id][0].id) {
        let json = JSON.parse(JSON.stringify(this.tebakkimia[id][1]))
        if (['.teka', 'Bantuan', ''].includes(m.text)) return !0
        if (m.text.toLowerCase() == json.unsur.toLowerCase().trim()) {
            db.data.users[m.sender].exp += this.tebakkimia[id][2]
            await this.sendBut(m.chat, benar + ` +${this.tebakkimia[id][2]} XP`, wm, 'Tebak Kimia', '.tebakkimia', m)
            clearTimeout(this.tebakkimia[id][3])
            delete this.tebakkimia[id]
        } else if (similarity(m.text.toLowerCase(), json.unsur.toLowerCase().trim()) >= threshold) m.reply(dikit)
        else m.reply(salah)
    }
    return !0
}

module.exports = handler
