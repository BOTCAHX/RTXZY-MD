let handler = async (m, { conn }) => {
    let wm = global.wm
    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    let tio = `
Mode : ${global.opts['self'] ? 'Self' : 'publik'}\nAktif selama ${uptime}\n${Object.keys(global.db.data.users).length} Pengguna\n${Object.entries(global.db.data.users).filter(user => user[1].banned).length} Pengguna Terbanned\nFitur Sering Digunakan : ${Object.entries(db.data.stats).length}\n\njika Mode Self
maka bot sedang tidur atau sedang dalam mode maintenance

jika Mode Public
maka bot sedang online dan bisa di pakai
    `.trim()
conn.send2But(m.chat, tio, wm, 'Speed', '.speed', 'Back', '.menu',m)
conn.reply(tio)
}
handler.help = ['mode']
handler.tags = ['main']
handler.customPrefix = /^(mode)$/i 
handler.command = new RegExp
handler.limit = false

module.exports = handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
