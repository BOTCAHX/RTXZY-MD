let handler = async (m, { conn, command }) => {
let nyenye = `https://api.lolhuman.xyz/api/random2/${command}?apikey=${lolkey}`
    conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['lewd', 'eron', 'solo', 'anal', 'keta', 'tits', 'kuni', 'solog', 'erok', 'feetg', 'lewdk', 'erofeet', 'holoero', 'classic', 'erokemo', 'futanari', 'eroyuri', 'yaoi']
handler.tags = ['nsfw']
handler.command = /^(lewd|eron|solo|anal|keta|tits|kuni|solog|erok|feetg|lewdk|erofeet|holoero|classic|erokemo|futanari|eroyuri|yaoi)$/i
//buatan hyzer, jgn hapus nama gw atuh 😊
module.exports = handler
 