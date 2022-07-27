import fetch from 'node-fetch'

let handler = async(m, { conn, usedPrefix, text, args, command }) => {
if (!text) throw `Contoh penggunaan ${usedPrefix}${command} https://s.id`
let caption = `Nihh banh ${command} nya`
let url = `https://shot.screenshotapi.net/screenshot?&url=${text}&full_page=true`
let ini = await fetch(url)
let has = await ini.json()
let ilnya = has.screenshot
await conn.sendFile(m.chat, ilnya, wm, wm, ftoko )
}
handler.help = ['lihat url']
handler.command = ['lihat', 'lihatweb', 'tampilkan']
handler.tags = ['tools']

export default handler
