let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `*CONTOH*\n${usedPrefix + command} Bot`
let teks = encodeURI(text)
if (command == 'attp') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=85faf717d0545d14074659ad&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}
}
handler.command = handler.help = ['attp']
handler.tags = ['sticker']
handler.limit = 3
module.exports = handler
