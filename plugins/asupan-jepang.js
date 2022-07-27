let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/japan'
conn.sendFile(m.chat, supa, null, 'Jepang', m)
}
handler.help = ['negaratetangga5']
handler.tags = ['asupan']
handler.command = /^(negaratetangga5)$/i

module.exports = handler
