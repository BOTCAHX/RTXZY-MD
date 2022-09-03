const { MessageType } = require("@adiwajshing/baileys")

async function handler(m, { command }) {
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) throw 'Kamu tidak sedang berada di anonymous chat'
            m.reply('Ok')
            let other = room.other(m.sender)
            if (other) conn.sendMessage(other, 'Partner meninggalkan chat',{quoted:m})
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) throw 'Kamu masih berada di dalam anonymous chat'
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                conn.send2But(room.a,'Menemukan partner', wm, 'leave', '.leave', 'next', '.next', m)
                room.b = m.sender
                room.state = 'CHATTING'
                conn.send2But(room.b,'Menemukan partner', wm, 'leave', '.leave', 'next', '.next', m)
            } else {
                let id = + new Date
                this.anonymous[id] = {
                    id,
                    a: m.sender,
                    b: '',
                    state: 'WAITING',
                    check: function (who = '') {
                        return [this.a, this.b].includes(who)
                    },
                    other: function (who = '') {
                        return who === this.a ? this.b : who === this.b ? this.a : ''
                    },
                }
                m.reply('Menunggu parter anonymous chat...')
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = 'anonymous'

handler.command = ['start', 'leave', 'next']
handler.private = true

module.exports = handler
