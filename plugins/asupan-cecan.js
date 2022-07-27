let handler = async(m,{text, conn}) => {
let supa = 'https://api.zacros.my.id/asupan/cecan'
conn.sendFile(m.chat, supa, null, 'Cewe cantik', m)
}
handler.help = ['cecan']
handler.tags = ['asupan']
handler.command = /^(cecan)$/i

module.exports = handler
