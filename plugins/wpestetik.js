let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/aesthetic.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "Wallpaper Aesthetic", 'Next', ".wpaesthetic", m)
}
handler.help = ['wpaesthetic']
handler.tags = ['image']
handler.command = /^wpaesthetic$/i

module.exports = handler
