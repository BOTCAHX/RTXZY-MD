const fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`

    try {
        const api = await fetch(`https://api.botcahx.live/api/dowloader/igdowloader?url=${args[0]}&apikey=${btc}`)
        const res = await api.json()

        for (let i of res.result) {
            conn.sendFile(m.chat, i.url, null, `*Instagram Downloader*`, m)
        }
    } catch (e) {
        throw `*Server Down!*`
    }
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instagramdl|igstroy)$/i
handler.limit = true

module.exports = handler
