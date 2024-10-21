let handler = async (m, { conn }) => {
    if (global.db.data.users[m.sender].money > 20) {
    let user = global.db.data.users[m.sender]
        global.db.data.users[m.sender]. money = 999999999
        global.db.data.users[m.sender].limit = 999999999999
        global.db.data.users[m.sender].exp = 99999999999
        global.db.data.users[m.sender].level = 1000
        m.reply(`_*SUKSES CHEAT TELAH AKTIF GUNAKAN DENGAN BIJAK*_`)
    } else {
        conn.reply(m.chat, 'miskin money nge cheat yhahaha, minimal 2jt money bos!', m);
    }
}
handler.command = /^(cheat)$/i
handler.owner = false
handler.premium = false


module.exports = handler;