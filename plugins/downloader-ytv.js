let fetch = require('node-fetch')
let handler = async (m, { conn, args }) => {
if (!args[0]) throw 'Example:\n.ytv https://youtu.be/qaJUdvtozUM'
m.reply(wait)
let res = await fetch(`https://api.onee.eu.org/api/ytmp4?url=${args[0]}&apikey=Q2HefoTR`)
if (!res.ok) throw await res.text()
let json = await res.json()
if (!json.status) throw json
let video  = json.result.result
await conn.sendFile(m.chat, video, 'video.mp4', `Title: *${json.result.title}*\nViews: *${json.result.views}*\nUploaded: *${json.result.uploadDate}*\n_Jika Video Berbentuk File BIN, Silahkan Unduh Dengan Link Berikut_\n*${json.result.result}*`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
}

handler.help = ['ytmp4']
handler.tags = ['downloader']
handler.command = /^(ytv|ytmp4|ytvideo)$/i
handler.limit = true

module.exports = handler
