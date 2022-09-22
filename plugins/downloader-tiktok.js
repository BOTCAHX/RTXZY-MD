// Fix Tiktok download by TioXd 
// fix delay
// fix bug
// Refresh otomatis

let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
if (!args[0]) throw 'Uhm..url nya mana?'
m.reply('_Tunggu bentar ya tod..._')
let res = await fetch(`https://botcahx-rest-api.up.railway.app/api/dowloader/tikok?url=${args[0]}`)
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.status) throw json
let { video, description, username } = json.result
await conn.sendFile(m.chat, video, 'video.mp4', `
💌 *Deskripsi*: ${description}\n
📛 *Username*: ${username}\n
*© By Tioxd*
`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
}

handler.help = ['tiktok <url>']
handler.tags = ['downloader']

handler.command = /^(tiktok|tt|tiktod)$/i
handler.limit = true
module.exports = handler
