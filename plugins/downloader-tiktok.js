let fg = require('api-dylux')
const { tiktokdl, tiktokdlv2, tiktokdlv3 } = require ('@bochilteam/scraper')

let handler = async (m, { conn, text, args, usedPrefix, command}) => {
if (!args[0]) throw `✳️ Masukkan tautan Tiktok\n\n 📌 Contoh: ${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`
if (!args[0].match(/tiktok/gi)) throw `❎ Periksa apakah tautannya dari tiktok`

try {
    let p = await fg.tiktok(args[0]) 
    let te = `
┌─⊷ SERVER 1
▢ *Username:* ${p.author}
▢ *Descripción:* ${p.title}
└───────────`
    
    conn.sendFile(m.chat, p.nowm, 'tt.mp4', te, m)
    } catch {  	
    try { 
	const { author: { nickname }, video, description } = await tiktokdl(args[0])
         .catch(async _ => await tiktokdlv2(args[0]))
         .catch(async _ => await tiktokdlv3(args[0]))
    const url = video.no_watermark2 || video.no_watermark || 'https://tikcdn.net' + video.no_watermark_raw || video.no_watermark_hd
    if (!url) throw '❎ Kesalahan mengunduh video'
    let tex = `
┌─⊷ SERVER 2 
▢ *Nickname:* ${nickname} ${description ? `\n▢ *Descripción:* ${description}` : ''}
└───────────`
conn.sendFile(m.chat, url, 'tt.mp4', tex, m)
} catch {
    m.reply(`❎ Kesalahan mengunduh video `)
}
} 
    
}  
handler.help = ['tiktok2']
handler.tags = ['downloader']
handler.command = /^(tiktok2)$/i
handler.limit = true

module.exports = handler
