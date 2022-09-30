let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/Technology.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "Wallpaper technology", 'Next', ".wptechnology", m)
}
handler.help = [wptechnogy']
handler.tags = ['image']
handler.command = /^wptechnology$/i

module.exports = handler
