let { instagramdl, instagramdlv2 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {

    if (!args[0]) throw `*Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`
    if (!args[0].match(/https:\/\/www.instagram.com\/(p|reel|tv)/gi)) throw `*Link salah! Perintah ini untuk mengunduh postingan ig/reel/tv, bukan untuk highlight/story!*\n\ncontoh:\n${usedPrefix + command} https://www.instagram.com/p/BmjK1KOD_UG/?utm_medium=copy_link`
    const results = await instagramdl(args[0]).catch(async _ => await instagramdlv2(args[0]))
    for (const { url } of results) await conn.sendFile(m.chat, url, 'instagram.mp4', `*${global.wm}*`, m)
}

handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|igdl|instagram)$/i
handler.limit = false
handler.group = false

module.exports = handler

async function shortlink(url) {
isurl = /https?:\/\//.test(url)
return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}
