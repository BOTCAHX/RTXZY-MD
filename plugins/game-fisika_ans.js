let poin = 10000
let handler = m => m

handler.before = async function (m) {
    if (!m.quoted) return !0
    let id = m.chat
    this.fisika = this.fisika ? this.fisika : {}
    if (!(id in this.fisika)) return !0
    if (m.quoted.id !== this.fisika[id][0].key.id) return !0
    let users = global.db.data.users[m.sender]
    let json = this.fisika[id][1]

    let input = (m.text || '').toLowerCase().trim()
    let answerIndex = ['a', 'b', 'c', 'd'].indexOf(input)
    if (answerIndex === -1) return !0 
    let pilihanUser = json.pilihan[answerIndex]
    let jawaban = json.jawaban.toLowerCase().trim()
    if (!pilihanUser) return !0
    if (pilihanUser.toLowerCase() === jawaban) {
        users.exp += this.fisika[id][2]
        users.money += poin
        m.reply(`*Benar!*\n+${poin} Money\n\n${json.deskripsi}`)
        clearTimeout(this.fisika[id][3])
        delete this.fisika[id]
    } 
    else {
        m.reply(`*Salah!*`)
    }
    return !0
}

handler.exp = 0
module.exports = handler

// readyRC