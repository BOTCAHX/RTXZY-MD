let { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn, text, command, args, usedPrefix, DevMode }) => { 
    conn.slots = conn.slots ? conn.slots : {}
    if (m.chat in conn.slots) return m.reply('Masih ada Yang Melakukan Slots Disini, Tunggu Sampai selesai!!')
    else conn.slots[m.chat] = true
    try { 
        if (args.length < 1) return m.reply(`Gunakan format *${usedPrefix}${command} [jumlah]*
contoh *${usedPrefix}${command} 10*`)
        let count = (typeof args[0] == 'number' ? Math.round(Math.max(args[0], 1)) : 1)
        let _spin1 = pickRandom(['1', '2', '3', '4', '5']) 
        let _spin2 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin3 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin4 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin5 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin6 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin7 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin8 = pickRandom(['1', '2', '3', '4', '5'])
        let _spin9 = pickRandom(['1', '2', '3', '4', '5'])
        let spin1 = (_spin1 * 1)
        let spin2 = (_spin2 * 1)
        let spin3 = (_spin3 * 1)
        let spin4 = (_spin4 * 1)
        let spin5 = (_spin5 * 1)
        let spin6 = (_spin6 * 1)
        let spin7 = (_spin7 * 1)
        let spin8 = (_spin8 * 1)
        let spin9 = (_spin9 * 1)
        let spins1 = (spin1 == 1 ? '🍊' : spin1 == 2 ? '🍇' : spin1 == 3 ? '🍉' : spin1 == 4 ? '🍌' : spin1 == 5 ? '🍍' : '')
        let spins2 = (spin2 == 1 ? '🍊' : spin2 == 2 ? '🍇' : spin2 == 3 ? '🍉' : spin2 == 4 ? '🍌' : spin2 == 5 ? '🍍' : '')
        let spins3 = (spin3 == 1 ? '🍊' : spin3 == 2 ? '🍇' : spin3 == 3 ? '🍉' : spin3 == 4 ? '🍌' : spin3 == 5 ? '🍍' : '')
        let spins4 = (spin4 == 1 ? '🍊' : spin4 == 2 ? '🍇' : spin4 == 3 ? '🍉' : spin4 == 4 ? '🍌' : spin4 == 5 ? '🍍' : '')
        let spins5 = (spin5 == 1 ? '🍊' : spin5 == 2 ? '🍇' : spin5 == 3 ? '🍉' : spin5 == 4 ? '🍌' : spin5 == 5 ? '🍍' : '')
        let spins6 = (spin6 == 1 ? '🍊' : spin6 == 2 ? '🍇' : spin6 == 3 ? '🍉' : spin6 == 4 ? '🍌' : spin6 == 5 ? '🍍' : '')
        let spins7 = (spin7 == 1 ? '🍊' : spin7 == 2 ? '🍇' : spin7 == 3 ? '🍉' : spin7 == 4 ? '🍌' : spin7 == 5 ? '🍍' : '')
        let spins8 = (spin8 == 1 ? '🍊' : spin8 == 2 ? '🍇' : spin8 == 3 ? '🍉' : spin8 == 4 ? '🍌' : spin8 == 5 ? '🍍' : '')
        let spins9 = (spin9 == 1 ? '🍊' : spin9 == 2 ? '🍇' : spin9 == 3 ? '🍉' : spin9 == 4 ? '🍌' : spin9 == 5 ? '🍍' : '' )
        let user = global.db.data.users[m.sender]
        user.money -= count * 1
        for (let i = 0; i < 3; i++) {
            m.reply(m.chat, `
            *🎰VIRTUAL SLOTS🎰*
            
${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}
${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])} <<==
${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}|${pickRandom(['🍊', '🍇', '🍉', '🍌', '🍍'])}
            
            `, m)
        }
        let WinOrLose, Hadiah
        if (spin1 == spin2 && spin2 == spin3 && spin3 == spin4 && spin4 == spin5 && spin5 == spin6 && spin6 == spin7 && spin7 == spin8 && spin8 == spin9) {
            WinOrLose = 'BIG JACKPOT🥳🥳'
            Hadiah = `+${count * 4}`
            user.money += count * 4
        } else if (spin4 == spin5 && spin5  == spin6) {
           WinOrLose = 'JACKPOT🥳' 
           Hadiah = `+${count * 2}`
           user.money += count * 2
        } else if ((spin1 == spin2 && spin2 == spin3) || (spin7 == spin8 && spin8 == spin9)) {  
            Hadiah = `-${count * 1}`
            WinOrLose = 'DIKIT LAGI!!'
        } else {
             Hadiah = `-${count * 1}`
             WinOrLose = 'YOU LOSE'
        } 
        conn.sendBut(m.chat, `
       *🎰VIRTUAL SLOTS🎰*

${spins1}|${spins2}|${spins3}
${spins4}|${spins5}|${spins6} <<==
${spins7}|${spins8}|${spins9}

*${WinOrLose}* *${Hadiah}*
`, wm, 'Main Lagi', '.slot ${text}', m)
    } catch (e) {
        console.log(e)
        conn.reply(m.chat, 'Error', m)
        if (DevMode) {
            for (let jid of global.owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user.jid)) {
                conn.sendMessage(jid, 'Menu.js error\nNo: *' + m.sender.split`@`[0] + '*\nCommand: *' + m.text + '*\n\n*' + e + '*', MessageType.text)
            }
        }
    } finally {
        delete conn.slots[m.chat]
    }
}
handler.help = ['slot', 'jackpot']
handler.tags = ['rpg', 'game']
handler.command = /^slot?|jac?kpot$/i

module.exports = handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}
