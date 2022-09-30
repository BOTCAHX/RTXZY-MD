let fetch = require("node-fetch")
let handler = async (m, usedPrefix, command) => {
 let g = await fetch(`https://raw.githubusercontent.com/inirey/RESTAPI/master/data/GameWallp.json`)
let f = await g.json()
let a = f[Math.floor(Math.random() * f.length)]
conn.sendButtonImg(m.chat, a, "Random Image", "Wallpaper Game", 'Next', ".wpgame", m)
}
handler.help = ['wpgame']
handler.tags = ['image']
handler.command = /^wpgame$/i

module.exports = handler
