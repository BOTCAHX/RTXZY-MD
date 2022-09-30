let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/CyberSpace.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "cyberspace", 'Next', ".cyberspace", m)
}
handler.help = ['cyberspace']
handler.tags = ['image']
handler.command = /^cyberspace$/i

module.exports = handler
