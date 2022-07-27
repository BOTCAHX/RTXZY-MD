let handler = async (m, { conn }) => {
let api-hyzer = `https://api.lolhuman.xyz/api/random/bts?apikey=${lolkey}`
    conn.sendButtonImg(m.chat, api-hyzer, 'Nih', wm2, 'NEXT', '.bts', m)
}
handler.help = ['bts']
handler.tags = ['asupan', 'image']
handler.command = /^(bts)$/i

module.exports = handler
