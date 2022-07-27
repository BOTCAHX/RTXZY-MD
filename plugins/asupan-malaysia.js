let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/malaysia'
conn.sendFile(m.chat, supa, null, 'Malaysia', m)
}
handler.help = ['negaratetangga3']
handler.tags = ['asupan']
handler.command = /^(negaratetangga3)$/i

module.exports = handler
