import similarity from 'similarity'

const threshold = 0.72

let handler: WaPlugin = m => m

handler.before = async function (m) {
    let id = m.chat
    if (!m.quoted) return !0

    this.tbkata = this.tbkata ? this.tbkata : {}
    if (!(id in this.tbkata)) return !0
    
    if (m.quoted.id !== this.tbkata[id][0].key.id) return !0
    
    let json = this.tbkata[id][1]
    let jawaban = json.jawaban.toLowerCase().trim()
    let teksUser = (m.text || '').toLowerCase().trim()
    if (!teksUser) return !0

    let sender = m.sender.split(':')[0] + '@s.whatsapp.net'

    if (teksUser === jawaban) {
        if (!global.db.data.users[sender]) {
            global.db.data.users[sender] = { money: 0 }
        }
        
        global.db.data.users[sender].money += this.tbkata[id][2];
        
        m.reply(`*Benar!*\n+${this.tbkata[id][2]} Kredit sosial`)
        
        clearTimeout(this.tbkata[id][3])
        delete this.tbkata[id]
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
export default handler