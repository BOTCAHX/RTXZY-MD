let handler = async (m, { conn, text, usedPrefix, command }) => {
let fetch = require("node-fetch")
let tio = 'Halo Kontol :v'
 await conn.sendFile(m.chat, 'https://database.tioclkp02.repl.co/Dengarkanlah.mp3', 'Dengarkanlah.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true, contextInfo: {
        externalAdReply: { showAdAttribution: true, title: tio,
 body: wm, sourceUrl: 'https://api.tiodevhost.my.id', thumbnail: await (await fetch('https://telegra.ph/file/cfbeb870983c988666691.jpg')).buffer()}} 
     })

}

handler.customPrefix = /^(crot)$/i
handler.command = new RegExp

module.exports = handler
