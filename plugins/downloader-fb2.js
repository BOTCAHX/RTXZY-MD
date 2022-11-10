const { facebookdl, facebookdlv2 } = require('@bochilteam/scraper')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Use example / Gunakan ${usedPrefix}${command} https://www.facebook.com/juankcortavarriaoficial/videos/218237676749570/`
    const { result } = await facebookdl(args[0]).catch(async _ => await facebookdlv2(args[0]))
    for (const { url, isVideo } of result.reverse()) conn.sendFile(m.chat, url, `facebook.${!isVideo ? 'bin' : 'mp4'}`, `© мυʀѕι∂ вσт-χмℓ`, m)
}
handler.help = ['fb2'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(fb2)?)$/i

module.exports = handler
