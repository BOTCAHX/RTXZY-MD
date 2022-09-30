//let handler = async (m, { conn, text, usedPrefix, command }) => {

//conn.sendImageAsSticker(m.chat, 'https://database.tioclkp02.repl.co/IMG-20220724-WA0225.png', m, { packname: "database replit", author: "@tioclkp.replit" })
//}

//handler.customPrefix = /^(Bot|p)$/i
//handler.command = new RegExp

//module.exports = handler


let fs = require('fs')
const { MessageType } = require('@adiwajshing/baileys')
let handler = async (m, { conn }) => {
let helloarie = fs.readFileSync('./mp3/Bot.opus') 
conn.sendFile(m.chat, helloarie, '', '', m, true)
//conn.sendMessage(m.chat, helloarie, MessageType.audio, {quoted: m, mimetype: 'audio/mp4', ptt:true})
// await conn.sendMessage(m.chat, { audio: { url: helloarie }, mimetype: 'audio/mp4'}, m)
}

handler.customPrefix = /^(bot|robot|p|bang)$/i
handler.command = new RegExp

handler.limit = true
handler.mods = false 
handler.premium = false
handler.group = false
handler.private = false

module.exports = handler
