let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/Indonesia'
conn.sendFile(m.chat, supa, null, 'indonesia', m)
}
handler.help = ['negarasendiri']
handler.tags = ['asupan']
handler.command = /^(negarasendiri)$/i

module.exports = handler
