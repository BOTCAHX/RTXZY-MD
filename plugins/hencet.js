let handler = async (m, { conn, text, usedPrefix, command }) => {
let fetch = require("node-fetch")
let tio = 'Berem Berem Hencet Berem'
 await conn.sendFile(m.chat, 'https://filetransfer.io/data-package/Lgwrrzow/download', 'hencetberem.mp3', null, m, true, {
type: 'audioMessage', 
ptt: true, contextInfo: {
        externalAdReply: { showAdAttribution: true, title: tio,
 body: wm, sourceUrl: 'https://botcahx-rest-api.up.railway.app', thumbnail: await (await fetch('https://telegra.ph/file/168c4b9765f88c8ab9c8c.png')).buffer()}} 
     })

}

handler.customPrefix = /^(hencet|hencet berem|henceut bereum)$/i 
handler.command = new RegExp

module.exports = handler
