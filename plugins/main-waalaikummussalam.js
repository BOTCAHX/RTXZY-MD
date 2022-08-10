let handler = async (m, { conn, text, usedPrefix, command }) => {

conn.sendImageAsSticker(m.chat, 'https://database.tioclkp02.repl.co/IMG-20220725-WA0019.png', m, { packname: "./database", author: "replit @tioclkp02.repl\n=>export data replit>Private data>[Stiker ini di kompres dari web HTML5 agak sedikit mirip dgn telegraf]" })
}

handler.customPrefix = /^ass?alam|اَلسَّلاَمُ عَلَيْكُمْ|السلام عليکم$/i // ketik bot (tanpa prefix)
handler.command = new RegExp
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null
module.exports = handler
