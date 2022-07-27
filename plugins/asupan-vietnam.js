let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/vietnam'
conn.sendFile(m.chat, supa, null, 'Vietnam', m)
}
handler.help = ['negaratetangga2']
handler.tags = ['asupan']
handler.command = /^(negaratetangga2)$/i

module.exports = handler
