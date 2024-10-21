const pets = ['kucing', 'anjing', 'serigala', 'phonix', 'rubah']

let handler = async (m, { conn, text: txt, usedPrefix, participants }) => {
    conn.battlepet = conn.battlepet ? conn.battlepet : {}
    let text = (txt || '').toLowerCase()
    let id = 'battle-' + m.sender
    let user = global.db.data.users[m.sender]
    let item = pets.filter(v => v in user && typeof user[v] == 'number')
    if (!item.includes(text)) return m.reply(`List Pet :\n${pets.map(v => { return `• ${v}` }).join('\n') }`)
    if (user[text] == 0) return m.reply('Kamu Tidak Memiliki Pet Ini!')
    if (typeof conn.battlepet[id] != "undefined" && conn.battlepet[id] == true) return m.reply(`Kamu masih berada di battle-pet.`)
    let users = participants.map(u => u.id)
    var lawan
    lawan = users[Math.floor(users.length * Math.random())]

    while (typeof global.db.data.users[lawan] == "undefined" || lawan == m.sender) {
        lawan = users[Math.floor(users.length * Math.random())]
    }

    m.reply(`*Kamu* (${text} level ${user[text]}) menantang *'@' +${conn.getName(lawan)}* (${text} level ${global.db.data.users[lawan][text]}) dan sedang dalam pertarungan.\n\nTunggu 5 menit lagi dan lihat siapa yg menang.`)
    conn.battlepet[id] = true

    await delay(300000)

    let kesempatan = []
    for (let i = 0; i < user[text]; i++) kesempatan.push(m.sender)
    for (let i = 0; i < global.db.data.users[lawan][text]; i++) kesempatan.push(lawan)

    let pointPemain = 0
    let pointLawan = 0
    for (let i = 0; i < 10; i++) {
        let unggul = getRandom(0, kesempatan.length - 1)
        if (kesempatan[unggul] == m.sender) pointPemain += 1
        else pointLawan += 1
    }

    if (pointPemain > pointLawan) {
        let hadiah = (pointPemain - pointLawan) * 10000
        user.money += hadiah
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Kamu* (${text} level ${user[text]}) menang melawan *${conn.getName(lawan)}* (${text} level ${global.db.data.users[lawan][text]}) karena kamu ${alasanMenang[getRandom(0, alasanMenang.length - 1)]}\n\nHadiah . ${hadiah.toLocaleString()}\n+1 Limit`)
    } else if (pointPemain < pointLawan) {
        let denda = (pointLawan - pointPemain) * 100000
        user.money -= denda
        user.limit += 1
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\n*Kamu* (${text} level ${user[text]}) kalah melawan *${conn.getName(lawan)}* (${text} level ${global.db.data.users[lawan][text]}) karena kamu ${alasanKalah[getRandom(0, alasanKalah.length - 1)]}\n\nMoney kamu berkurang ${denda.toLocaleString()}\n+1 Limit`)
    } else {
        m.reply(`*${conn.getName(m.sender)}* [${pointPemain * 10}] - [${pointLawan * 10}] *${conn.getName(lawan)}*\n\nHasil imbang kak, ga dapet apa apa`)
    }

    delete conn.battlepet[id]
}
handler.help = ['battlepet']
handler.tags = ['rpg']
handler.command = /^(battlepet)$/i

handler.register = true
handler.group = true
handler.rpg = true

module.exports = handler

function getRandom(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const alasanKalah = ['Noob', 'Cupu', 'Kurang hebat', 'Ampas kalahan', 'Gembel kalahan', 'Pet Jelek', 'Level Kecil']
const alasanMenang = ['Hebat', 'Pro', 'Master Game', 'Legenda game', 'Sangat Pro', 'Rajin Nge-push']

const delay = time => new Promise(res => setTimeout(res, time));