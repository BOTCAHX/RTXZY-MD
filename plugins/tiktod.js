let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
if (!args[0]) throw 'Url nya mana goblok?\nContoh : .tiktod https://vm.tiktok.com/ZGJAmhSrp/ '
m.reply('_Tunggu bentar ya ngentod..._')
let res = await fetch(`https://botcahx-rest-api.up.railway.app/api/dowloader/tikok?url=${args[0]}`)
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.status) throw json
let { video, description, username } = json.result
await conn.sendFile(m.chat, video, 'video.mp4', `
💌 *Deskripsi*: ${description}\n
📛 *Username*: ${username}\n
🏢 *Team* :\n• RadhinDev\n• TioXd
`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
}

handler.help = ['tiktod <url>']
handler.tags = ['downloader']

handler.command = /^(tiktod)$/i
handler.limit = true
module.exports = handler
