async function handler(m, { command, usedPrefix, isOwner }) {
    if (!global.db.data.settings[this.user.jid].anon) return await this.sendBut(m.chat, isOwner ? 'Aktifkan' : 'Anonymous Chat dimatikan', wm2, isOwner ? 'Aktifkan' : 'Owner', isOwner ? '.on anon' : '.owner', m)
    command = command.toLowerCase()
    this.anonymous = this.anonymous ? this.anonymous : {}
    switch (command) {
        case 'next':
        case 'leave': {
            let room = Object.values(this.anonymous).find(room => room.check(m.sender))
            if (!room) return await this.sendBut(m.chat, '_Kamu tidak sedang berada di anonymous chat_', wm2, 'Cari Partner', `${usedPrefix}start`, m)
            m.reply('_Ok_')
            let other = room.other(m.sender)
            if (other) await this.sendBut(other, '_Partner meninggalkan chat_', wm2, 'Cari Partner', `${usedPrefix}start`, m)
            delete this.anonymous[room.id]
            if (command === 'leave') break
        }
        case 'start': {
            if (Object.values(this.anonymous).find(room => room.check(m.sender))) return await this.sendBut(m.chat, '_Kamu masih berada di dalam anonymous chat, menunggu partner_', wm2, 'Keluar', `${usedPrefix}leave`, m)
            let room = Object.values(this.anonymous).find(room => room.state === 'WAITING' && !room.check(m.sender))
            if (room) {
                await this.sendBut(room.a, '_Partner ditemukan!_', wm2, 'Next', `${usedPrefix}next`, m)
                room.b = m.sender
                room.state = 'CHATTING'
                await this.sendBut(room.b, '_Partner ditemukan!_', wm2, 'Next', `${usedPrefix}next`, m)
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
                await this.sendBut(m.chat, '_Menunggu partner..._', wm2, 'Keluar', `${usedPrefix}leave`, m)
            }
            break
        }
    }
}
handler.help = ['start', 'leave', 'next']
handler.tags = ['anonymous']
handler.command = ['start', 'leave', 'next']

handler.private = true

module.exports = handler