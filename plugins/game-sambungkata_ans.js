const { sKata, cKata } = require('../lib/sambung-kata')

let handler = m => m

handler.before = async function (m, { conn }) {
    this.skata = this.skata || {}
    let id = m.chat
    if (!(id in this.skata)) return true
    let room = this.skata[id]
    let users = db.data.users
    let _kata = room.new ? await genKata() : ''
    let member = room.player
    let bonus = rwd(500, 600)
    
    function mmr(type, jid) {
        let user = db.data.users[jid]
        if (type === 'win') {
            return user.skata > 5000 ? rwd(5, 9) : user.skata > 3000 ? rwd(5, 10) : user.skata > 1500 ? rwd(10, 15) : user.skata > 1000 ? rwd(15, 20) : user.skata > 500 ? rwd(20, 30) : rwd(30, 50)
        } else {
            return user.skata > 8000 ? rwd(35, 50) : user.skata > 5000 ? rwd(25, 30) : user.skata > 3000 ? rwd(20, 25) : user.skata > 1500 ? rwd(15, 19) : user.skata > 1000 ? rwd(10, 14) : user.skata > 500 ? rwd(5, 9) : rwd(1, 5)
        }
    }

    if (room.new) {
        if (!/nextkata/i.test(m.text)) return true
        room.new = false
        room.killer = false
        room.kata = _kata
        room.chat = await this.reply(m.chat, `Saatnya @${room.curr.split('@')[0]}\nMulai : *${_kata.toUpperCase()}*\n*${room.filter(_kata).toUpperCase()}... ?*\nJawab dengan mengetik langsung!\n"nyerah" untuk menyerah`, 0, { contextInfo: { mentionedJid: member } })
        
        clearTimeout(room.waktu)
        room.waktu = setTimeout(async () => {
            if (this.skata[id] && this.skata[id].curr === room.curr) {
                this.reply(m.chat, `Waktu jawab habis\n@${room.curr.split('@')[0]} tereliminasi`, room.chat, { contextInfo: { mentionedJid: room.player } }).then(_ => {
                    room.eliminated.push(room.curr)
                    let index = room.player.indexOf(room.curr)
                    room.player.splice(index, 1)
                    if (room.player.length == 1) {
                        users[room.player[0]].exp += room.win_point
                        this.reply(m.chat, `@${room.player[0].split('@')[0]} Menang\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: room.player } })
                        delete this.skata[id]
                        return
                    }
                    room.curr = room.player[index % room.player.length]
                    room.new = true
                    this.reply(m.chat, `Ketik *nextkata* untuk lanjut ke @${room.curr.split('@')[0]}`, 0, { contextInfo: { mentionedJid: [room.curr] } })
                })
            }
        }, 45000)
    }

    if (room.curr == m.sender) {
        if (/nyerah/i.test(m.text)) {
            clearTimeout(room.waktu)
            let lose_skata = mmr('lose', room.curr)
            let win_skata = room.killer ? mmr('win', room.killer) : 0
            users[room.curr].skata -= lose_skata
            if (room.killer) users[room.killer].skata += win_skata
            room.eliminated.push(room.curr)
            let index = room.player.indexOf(room.curr)
            room.player.splice(index, 1)
            
            if (room.player.length == 1) {
                users[room.player[0]].exp += room.win_point
                this.reply(m.chat, `@${m.sender.split('@')[0]} menyerah!\n@${room.player[0].split('@')[0]} Berhasil bertahan\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: [m.sender, room.player[0]] } })
                delete this.skata[id]
                return true
            }
            
            room.curr = room.player[index % room.player.length]
            await this.reply(m.chat, `@${m.sender.split('@')[0]} menyerah!`, m, { contextInfo: { mentionedJid: [m.sender] } })
            
            room.new = true
            // Trigger nextkata automatically
            let who = room.curr
            this.reply(m.chat, `Ketik *nextkata* untuk lanjut ke @${room.curr.split('@')[0]}`, 0, { contextInfo: { mentionedJid: [room.curr] } })
            return true
        }
        
        let answerF = m.text.toLowerCase().trim().replace(/[^a-z]/gi, '')
        let checkF = await cKata(m.text.toLowerCase().split` `[0])
        if (!answerF.startsWith(room.filter(room.kata)) || !checkF.status || room.basi.includes(answerF)) {
            return m.reply(`👎 *Salah!*
Jawaban tidak valid atau sudah digunakan!`)
        }
        
        clearTimeout(room.waktu)
        users[m.sender].exp += bonus
        room.basi.push(answerF)
        room.win_point += 200
        room.kata = answerF
        let nextIndex = (room.player.indexOf(room.curr) + 1) % room.player.length
        room.curr = room.player[nextIndex]
        room.chat = await this.reply(m.chat, `👍+${bonus}XP\nGiliran @${room.curr.split('@')[0]}\n*${room.filter(answerF).toUpperCase()}... ?*\nJawab dengan mengetik langsung!\n"nyerah" untuk menyerah`, m, { contextInfo: { mentionedJid: member } })
        
        // Reset timeout for next player
        room.waktu = setTimeout(async () => {
            if (this.skata[id] && this.skata[id].curr === room.curr) {
                this.reply(m.chat, `Waktu jawab habis\n@${room.curr.split('@')[0]} tereliminasi`, room.chat, { contextInfo: { mentionedJid: room.player } }).then(_ => {
                    room.eliminated.push(room.curr)
                    let index = room.player.indexOf(room.curr)
                    room.player.splice(index, 1)
                    if (room.player.length == 1) {
                        users[room.player[0]].exp += room.win_point
                        this.reply(m.chat, `@${room.player[0].split('@')[0]} Menang\n+${room.win_point}XP`, room.chat, { contextInfo: { mentionedJid: room.player } })
                        delete this.skata[id]
                        return
                    }
                    room.curr = room.player[index % room.player.length]
                    room.new = true
                    this.reply(m.chat, `Ketik *nextkata* untuk lanjut ke @${room.curr.split('@')[0]}`, 0)
                })
            }
        }, 45000)
    } else {
        if (room.status === 'play') {
            return m.reply(room.eliminated.includes(m.sender) ? `Kamu sudah tereliminasi!` : `_Bukan giliranmu!_`)
        }
    }
    return true
}

module.exports = handler

async function genKata() {
    let json = await sKata()
    return json.kata.length >= 3 ? json.kata : await genKata()
}

function rwd(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
