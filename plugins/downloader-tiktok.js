const fg = require('api-dylux') 
const { tiktokdl, tiktokdlv2, tiktokdlv3 } = require('@bochilteam/scraper')
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `✳️ Masukan link Tiktok\n\n 📌 Example : ${usedPrefix + command} https://vm.tiktok.com/ZMYG92bUh/`
if (!args[0].match(/tiktok/gi)) throw `❎ Bukan link dari tiktok`


try {
    let p = await fg.tiktok(args[0]) 
    let te = `
┌─⊷ TIKTOK
▢ *Nombre:* ${p.nickname}
▢ *Username:* ${p.unique_id}
▢ *Durasi:* ${p.duration}
▢ *Desk:* ${p.description}
└───────────`
    conn.sendFile(m.chat, p.play, 'tiktok.mp4', te, m)
    } catch {  	
    try { 
	const { author: { nickname }, video, description } = await tiktokdl(args[0])
         .catch(async _ => await tiktokdlv2(args[0]))
         .catch(async _ => await tiktokdlv3(args[0]))
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
    if (!url) throw '❎ Error al descargar el video'
    conn.sendFile(m.chat, url, 'fb.mp4', `
┌─⊷ *TIKTOK DL-2*
▢ *Nickname:* ${nickname} ${description ? `\n▢ *Desc:* ${description}` : ''}
└───────────`, m)
} catch {
    m.reply(`❎ Error`)
}
} 
    
}  
handler.help = ['tiktok']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm|dltt)$/i
handler.limit = true

module.exports = handler