let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/Programming.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "Wallpaper Programming", 'Next', ".wpprograming", m)
}
handler.help = ['wpprograming']
handler.tags = ['image']
handler.command = /^wpprogramming$/i

module.exports = handler
