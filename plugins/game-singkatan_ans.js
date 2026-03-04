    const similarity = require('similarity')
    const threshold = 0.72

    let handler = m => m

    handler.before = async function (m) {
        let id = m.chat
        if (!m.quoted) return !0

         this.singkatan =  this.singkatan ?  this.singkatan : {}
        if (!(id in  this.singkatan)) return !0
        if (m.quoted.id !==  this.singkatan[id][0].key.id) return !0
        let json =  this.singkatan[id][1]
        let kepanjangan = json.kepanjangan.toLowerCase().trim();
        let teksUser = (m.text || '').toLowerCase().trim()
        if (!teksUser) return !0
        if (teksUser === kepanjangan) {
            global.db.data.users[m.sender].money +=  this.singkatan[id][2]
            m.reply(`*Benar!*\n+${ this.singkatan[id][2]} Kredit sosial`)
            clearTimeout( this.singkatan[id][3])
            delete  this.singkatan[id]
        } 
        else if (similarity(teksUser, kepanjangan) >= threshold) {
            m.reply(`*Dikit Lagi!*`)
        } 
        else {
            m.reply(`*Salah!*`)
        }

        return !0
    }

    handler.exp = 0
    module.exports = handler

    // readyRC
