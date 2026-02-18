const similarity = require('similarity')
const threshold = 0.72

    let handler = m => m

    handler.before = async function (m) {
        let id = m.chat
        if (!m.quoted) return !0

        this.tebakjkt = this.tebakjkt ? this.tebakjkt : {}
        if (!(id in this.tebakjkt)) return !0
        if (m.quoted.id !== this.tebakjkt[id][0].key.id) return !0
        let json = this.tebakjkt[id][1]
        let jawaban = json.jawaban.toLowerCase().trim()
        let teksUser = (m.text || '').toLowerCase().trim()
        if (!teksUser) return !0
        if (teksUser === jawaban) {
            global.db.data.users[m.sender].exp += this.tebakjkt[id][2]
            m.reply(`*Benar!*\n+${this.tebakjkt[id][2]} Kredit sosial`)
            clearTimeout(this.tebakjkt[id][3])
            delete this.tebakjkt[id]
        } 
        else if (similarity(teksUser, jawaban) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } 
        else {
            m.reply(`*Salah!*`)
        }

        return !0
    }

    handler.exp = 0
    module.exports = handler
