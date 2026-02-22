const similarity = require('similarity')
const threshold = 0.72 
let rewardAmount = 1000 //ganti ini buat jumlah money nya

module.exports = {
    async before(m) {
        this.family = this.family ? this.family : {}
        let id = m.chat
        if (!(id in conn.family)) return 
        let room = conn.family[id] 
        if (room.jawaban == undefined) {
            delete conn.family[id]
            return !0
        }
        let text = m.text.toLowerCase().replace(/[^\w\s\-]+/, '')
        if (!room) return !0

        if (text === 'nyerah') {
            let allAnswers = room.jawaban.map((jawaban, index) => `(${index + 1}) ${jawaban}`).join('\n')
            this.reply(m.chat, `Permainan berakhir karena menyerah.\n\nJawaban yang benar:\n${allAnswers}`, room.msg)
            clearTimeout(room.timeout)
            delete conn.family[id]
            return !0
        }

        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            if (Math.max(...room.jawaban.filter((_, index) => !room.terjawab[index]).map(jawaban => similarity(jawaban, text))) >= threshold) m.reply('Dikit lagi!')
                else m.reply(`*Salah!*`)
            return !0
        }
        if (room.terjawab[index]) return !0
        let users = global.db.data.users[m.sender]
        room.terjawab[index] = m.sender
        users.money += rewardAmount 

        let isWin = room.terjawab.length === room.terjawab.filter(v => v).length
        let caption = `
*Soal:* ${room.soal}

Terdapat *${room.jawaban.length}* jawaban${room.jawaban.find(v => v.includes(' ')) ? `
(beberapa jawaban terdapat spasi)
`: ''}
${isWin ? `*SEMUA JAWABAN TERJAWAB*\nSelamat, Anda telah menjawab semua jawaban dengan benar!` : ''}
${Array.from(room.jawaban, (jawaban, index) => {
            return room.terjawab[index] ? `(${index + 1}) ${jawaban} ${room.terjawab[index] ? '@' + room.terjawab[index].split('@')[0] : ''}`.trim() : false
        }).filter(v => v).join('\n')}

+${rewardAmount} kredit sosial! tiap jawaban benar
    `.trim()
    
        if (conn.family[id].msg_old) await this.sendMessage(m.chat, { delete: conn.family[id].msg_old.key }).catch(e => e)
        let msg_old = await this.reply(m.chat, caption, m).then(msg => {
            return conn.family[id].msg = msg
        }).catch(_ => _)
        conn.family[id].msg_old = msg_old

        if (isWin) {
            clearTimeout(room.timeout)
            setTimeout(() => {
                this.sendMessage(m.chat, { delete: conn.family[id].msg.key }).catch(e => e)
                delete conn.family[id]
            }, 5000) // ganti ke 5 detik 10d etik kelamaan
        }
        return !0
    }
}

//danaputra_133
