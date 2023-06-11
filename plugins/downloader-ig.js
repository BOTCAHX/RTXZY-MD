const { instagram } = require("@xct007/frieren-scraper")

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Gunakan contoh ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`
    const res = await instagram.v1(args[0])
    for (let i of res) {
        conn.sendFile(m.chat, i.url, null, `*Instagram Downloader*`, m)
    }
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(Instagram|ig|igdl)$/i
handler.limit = true

module.exports = handler
