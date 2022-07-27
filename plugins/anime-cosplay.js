let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/randomimg/cosplay'
conn.sendFile(m.chat, supa, null, 'Nih', m)
}
handler.help = ['cosplay']
handler.tags = ['anime']
handler.command = /^(cosplay)$/i

module.exports = handler
