let handler = async (m, { conn }) => {
let rest = 'https://api.zacros.my.id/randomimg/darkjokes'
    conn.sendButtonImg(m.chat, rest, 'Dark? 🤨', wm2, 'NEXT', '.darkjokes', m)
}
handler.help = ['darkjokes']
handler.tags = ['internet', 'fun']
handler.command = /^(dragjokes|darkjokes)$/i

module.exports = handler