const { googleImage } = require('@bochilteam/scraper')

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`
    const res = await googleImage(text)
    let image = pickRandom(res)
    let link = image
    conn.sendFile(m.chat, link, 'google.jpg', `*G O O G L E*\n*Result:* ${text}\n*Source:* https://google.com`, m)
}
handler.help = ['gimage <query>', 'image <query>']
handler.tags = ['internet']
handler.command = /^(gimage|image)$/i

module.exports = handler

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
