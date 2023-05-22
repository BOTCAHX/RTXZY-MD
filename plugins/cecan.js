let fetch = require('node-fetch')
let handler = async (m, { conn, command }) => {
let buffer = await fetch(`https://api.betabotz.org/api/cecan/${command}?apikey=${lann}`).then(res => res.buffer())
conn.sendFile(m.chat, buffer, 'hasil.jpg', "Random " + command, m)
}
handler.command = handler.help = ['china', 'indonesia', 'japan', 'vietnam', 'thailand', 'korea', 'malaysia']
handler.tags = ['internet']
module.exports = handler
