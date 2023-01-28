
let handler = async (m, { conn, command }) => {
let nyenye = `https://api.zahwazein.xyz/api/morensfw/${command}?apikey=8dd8336cbd`
    conn.sendButtonImg(m.chat, nyenye, 'Nih', wm2, 'Next', `.${command}`, m) 
}
handler.help = ['ahegao', 'ass', 'bdsm', 'blowjob', 'cum', 'cuckold', 'ero', 'femdom', 'foot', 'gangbang', 'glasses', 'hentai', 'hentaigif', 'jahy', 'maid', 'manga', 'neko', 'orgy', 'panties', 'pussy','sfwneko', 'tentacles', 'thighs', 'yuri', 'zettairyouiki']
handler.tags = ['nsfw']
handler.command = /^(ahegao|ass|bdsm|blowjob|cum|cuckold|ero|femdom|foot|gangbang|glasses|hentai|hentaigif|jahy|maid|manga|neko|orgy|panties|pussy|sfwneko|tentacles|thighs|yuri|zettairyouiki)$/i
module.exports = handler

