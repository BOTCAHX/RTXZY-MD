const similarity = require('similarity')
const threshold = 0.72

module.exports = {
    async before(m) {
        this.game = this.game ? this.game : {}

        let id = 'family100_' + m.chat
        if (!(id in this.game)) return !0

        let room = this.game[id]
        if (!room) return !0

        let text = (m.text || '')
            .toLowerCase()
            .replace(/[^\w\s\-]+/g, '')
            .trim()

        if (!text) return !0
        if (text === 'nyerah') {
            let allAnswers = room.jawaban
                .map((j, i) => `(${i + 1}) ${j}`)
                .join('\n')

            this.reply(
                m.chat,
                `Permainan berakhir karena menyerah.\n\nJawaban yang benar:\n${allAnswers}`,
                room.msg
            )

            clearTimeout(room.timeout)
            delete this.game[id]
            return !0
        }
        let index = room.jawaban.indexOf(text)
        if (index < 0) {
            let belumTerjawab = room.jawaban.filter((_, i) => !room.terjawab[i])
            if (belumTerjawab.length > 0) {
                let maxSim = Math.max(
                    ...belumTerjawab.map(j => similarity(j, text))
                )
                if (maxSim >= threshold) m.reply('Dikit lagi!')
            }
            return !0
        }

        if (room.terjawab[index]) return !0
        if (!global.db.data.users[m.sender])
            global.db.data.users[m.sender] = { money: 0 }

        let users = global.db.data.users[m.sender]

        room.terjawab[index] = m.sender
        users.money += room.rewardAmount

        let isWin =
            room.terjawab.filter(v => v).length === room.jawaban.length

        let caption = `
*Soal:* ${room.soal}

Terdapat *${room.jawaban.length}* jawaban
${isWin ? `\n*SEMUA JAWABAN TERJAWAB!* 🎉` : ''}

${room.jawaban.map((j, i) => {
    return room.terjawab[i]
        ? `(${i + 1}) ${j} @${room.terjawab[i].split('@')[0]}`
        : ''
}).filter(Boolean).join('\n')}

+${room.rewardAmount} Money tiap jawaban benar
        `.trim()

        m.reply(caption, null, {
            contextInfo: {
                mentionedJid: this.parseMention(caption)
            }
        }).then(msg => {
            if (this.game[id]) this.game[id].msg = msg
        }).catch(() => {})

        if (isWin) {
            clearTimeout(room.timeout)
            delete this.game[id]
        }

        return !0
    }
}
