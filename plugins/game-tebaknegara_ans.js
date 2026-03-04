    const similarity = require('similarity')
    const threshold = 0.72

    let handler = m => m

    handler.before = async function (m) {
        let id = m.chat
        if (!m.quoted) return !0

         this.tebaknegara =  this.tebaknegara ?  this.tebaknegara : {}
        if (!(id in  this.tebaknegara)) return !0
        if (m.quoted.id !==  this.tebaknegara[id][0].key.id) return !0
        let json =  this.tebaknegara[id][1]
        let jawaban = json.jawaban.toLowerCase().trim();
        let teksUser = (m.text || '').toLowerCase().trim()
        if (!teksUser) return !0
        if (teksUser === jawaban) {
            global.db.data.users[m.sender].money += this.tebaknegara[id][2];
            m.reply(`*Benar!*\n+${ this.tebaknegara[id][2]} Kredit sosial`)
            clearTimeout( this.tebaknegara[id][3])
            delete  this.tebaknegara[id]
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
