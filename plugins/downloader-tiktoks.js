const { tiktokdl, tiktokdlv2, tiktokdlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
	if (!args[0]) throw `Link tiktoknya mana?\n\ncontoh:\n${usedPrefix}${command} https://vm.tiktok.com/ZGJAmhSrp/`
    tiktokdlv2(args[0]).then(r => {
    let video = r.video.no_watermark
    conn.sendFile(m.chat, video, '', `*${wm}*`, m)
    })
}
handler.help = ['tiktok1'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.limit = true
handler.group = false

handler.command = /^(tiktok1)$/i

module.exports = handler
