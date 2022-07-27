let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/randomimg/loli'
conn.sendFile(m.chat, supa, null, 'Nih', m)
}
handler.help = ['loli']
handler.tags = ['anime']
handler.command = /^(loli)$/i

module.exports = handler
