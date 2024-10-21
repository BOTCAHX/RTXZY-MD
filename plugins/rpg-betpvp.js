const items = [ 'money', 'diamond', 'emas', 'berlian' ]
let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.judipvp = conn.judipvp ? conn.judipvp : {}
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.sender))) throw 'Selesaikan judi mu yang sebelumnya'
    if (Object.values(conn.judipvp).find(room => room.id.startsWith('judipvp') && [room.p, room.p2].includes(m.mentionedJid[0]))) throw `Orang yang kamu tantang sedang bermain judipvp bersama orang lain :(`
    let musuh = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : false
    let user = global.db.data.users
    let item = items.filter(v => v in user[m.sender] && typeof user[m.sender][v] == 'number')
    let type = (args[0] || '').toLowerCase()
    let count = (args[1] && number(parseInt(args[1])) ? Math.max(parseInt(args[1]), 1): /all/i.test(args[1]) ? Math.floor(parseInt(user[type])): 1) * 1
    let id = 'judipvp_' + new Date() * 1
    if (user[m.sender][type] < count) return m.reply(`${type} kamu tidak cukup!`)
    if (!item.includes(type)) return m.reply('Item yang tersedia\n• Money\n• diamond\n• emas\n• berlian')
    if (!count || !musuh) return m.reply(`Masukan format dengan benar\n\nContoh :\n${usedPrefix + command} money 10000 ${m.sender.split('@')[0]}`)
    conn.judipvp[id] = {
        chat: await conn.reply(m.chat, `@${m.sender.split('@')[0]} Mengajak @${musuh.split('@')[0]} Berjudi Apakah Kamu Mau Menerimanya? (Y/N)`, m, {
            contextInfo: { mentionedJid: [m.sender, musuh] } 
        }),
        id: id,
        p: m.sender,
        p2: musuh,
        type: type,
        status: 'wait',
        taruhan: count,
        waktu: setTimeout(() => {
            if (conn.judipvp[id]) conn.reply(m.chat, `_Waktu judi habis_`, m)
            delete conn.judipvp[id]
        }, 60000)
    }
}
handler.help = ['judipvp <type> <count> <tag>']
handler.tags = ['rpg']
handler.command = /^(judipvp)$/i
handler.register = true
handler.group = true
module.exports = handler

function number(x = 0) {
    x = parseInt(x)
    return !isNaN(x) && typeof x == 'number'
}