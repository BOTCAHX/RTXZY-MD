let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/santuy'
conn.sendFile(m.chat, supa, null, 'Nih', m)
}
handler.help = ['santuy']
handler.tags = ['asupan']
handler.command = /^(santuy)$/i

module.exports = handler
