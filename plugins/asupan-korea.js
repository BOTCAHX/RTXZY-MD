let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/korea'
conn.sendFile(m.chat, supa, null, 'Korea', m)
}
handler.help = ['negaratetangga4']
handler.tags = ['asupan']
handler.command = /^(negaratetangga4)$/i

module.exports = handler
