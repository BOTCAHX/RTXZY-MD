let handler = async(m, { conn, text, args, usedPrefix, command }) => {
if (!text) throw `Contoh\n${usedPrefix + command} Bot`
let teks = encodeURI(text)

if (command == 'attp') {
conn.sendFile(m.chat, `https://api.lolhuman.xyz/api/attp?apikey=85faf717d0545d14074659ad&text=${teks}`, 'sticker.webp', '', m, { asSticker: true })}

}
handler.help = ['attp <teks>']
handler.tags = ['sticker']

handler.command = /^attp$/i

module.exports = handler
