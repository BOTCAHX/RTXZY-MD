const { igdl } = require('btch-downloader')
let handler = async (m, { conn, args, usedPrefix, command }) => {
        if (!args[0]) throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
try {
        const res = await igdl(args[0])
        for (let i of res.url) {
            conn.sendFile(m.chat, i, null, `*Instagram Downloader*`, m)
        }
    } catch (e) {
        throw `*Server Down!*`
    }
}
handler.help = ['instagram','igstory'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instagramdl|igstory)$/i
handler.limit = true

module.exports = handler
