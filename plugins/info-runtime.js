let handler = async (m, { conn, usedPrefix, command }) => {
    let _uptime = process.uptime() * 1000
    let tio = clockString(_uptime)
    let time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')

var reply = `
*───「 RUNTIME BOT 」───*

Runtime : ${tio}
    `

conn.sendMessage(m.chat, {
text: reply,
contextInfo: {
externalAdReply: {
title: "",
body: time,
thumbnailUrl: "https://telegra.ph/file/dc5a67d724b016574129b.jpg",
sourceUrl: "",
mediaType: 1,
renderLargerThumbnail: true
}}})

}
handler.help = ['runtime']
handler.tags = ['info']
handler.command = /^(uptime|runtime)$/i

module.exports = handler

function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " Day " + hours + " Hour " + minutes + " Minute " + sec + " Second ";
}