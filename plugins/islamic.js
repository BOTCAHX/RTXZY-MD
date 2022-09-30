let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/Islamic.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "islamic", 'Next', ".islamic", m)
}
handler.help = ['islamic']
handler.tags = ['image']
handler.command = /^islamic$/i

module.exports = handler
