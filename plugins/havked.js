let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/hekel.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "Hengkel", 'Next', ".hacker", m)
}
handler.help = ['hacker']
handler.tags = ['image']
handler.command = /^hacker$/i

module.exports = handler
