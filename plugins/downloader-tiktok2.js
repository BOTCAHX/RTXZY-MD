const { tiktok } = require('../scraper/tiktok');
let handler = async (m, { conn, text, args, usedPrefix, command}) => {
    if (!args[0]) throw `*Masukan link Tiktok*\n\n*Example :* ${usedPrefix + command} https://vm.tiktok.com/ZMYG92bUh/`
    if (!args[0].match(/tiktok/gi)) throw `Bukan tautan dari tiktok!`
    try {
        const res = await tiktok(args[0]);
        const { video, title, title_audio } = res;
        conn.sendFile(m.chat, video[0], 'tiktok.mp4', `
┌─⊷ *TIKTOK DL*
▢ *Title:* ${title}
▢ *Title Audio:* ${title_audio}
└───────────`, m)
    } catch (err) {
        console.log(err)
        m.reply(`_Server error!_`)
    }
}  
handler.help = ['tiktok2']
handler.tags = ['downloader']
handler.command = /^(tiktok2)$/i
handler.limit = true

module.exports = handler
