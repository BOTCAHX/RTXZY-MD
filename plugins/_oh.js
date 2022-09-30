let fs = require('fs')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
let helloarie = fs.readFileSync('./mp3/oh.opus') 
conn.sendFile(m.chat, helloarie, '', '', m, true)
//conn.sendMessage(m.chat, helloarie, MessageType.audio, {quoted: m, mimetype: 'audio/mp4', ptt:true})
// await conn.sendMessage(m.chat, { audio: { url: helloarie }, mimetype: 'audio/mp4'}, m)
}

handler.customPrefix = /^(oh|ho)$/i
handler.command = new RegExp

handler.limit = false
handler.mods = false 
handler.premium = false
handler.group = false
handler.private = false

module.exports = handler
