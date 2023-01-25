let handler = async(m,{text, conn}) => {
let supa = 'https://api.botcahx.bid.iz/api/randomgambar/dadu?apikey=Admin'
conn.sendFile(m.chat, supa, null, 'stiker', m)
}
handler.help = ['kocokdadu']
handler.tags = ['game']
handler.command = /^(kocokdadu)$/i

module.exports = handler
