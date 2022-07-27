let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/china'
conn.sendFile(m.chat, supa, null, 'Chinese', m)
}
handler.help = ['negaratetangga6']
handler.tags = ['asupan']
handler.command = /^(negaratetangga6)$/i

module.exports = handler
