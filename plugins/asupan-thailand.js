let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/thailand'
conn.sendFile(m.chat, supa, null, 'Thailand', m)
}
handler.help = ['negaratetangga1']
handler.tags = ['asupan']
handler.command = /^(negaratetangga1)$/i

module.exports = handler
