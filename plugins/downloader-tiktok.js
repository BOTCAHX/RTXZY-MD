/**Coba aja dlu gua bingung mau pake scraper suka error makanya 
Coba pake apikey malesin dlu wkwk**/

let https = require('axios')
let handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `contoh:\n ${usedPrefix}${command} https://vm.tiktok.com/ZGJAmhSrp/`
let tio = (await https.get(API('males', '/tiktok', { url: args[0] } ))).data;
if (tio.status != 200) throw tio.message;
if (!tio) throw tio.message;
 let hasilnya = `*Title:* ${tio.title}\n\n*Author:* ${tio.author}`
  conn.sendButtonVid(m.chat, tio.video, hasilnya, wm, `Back`, `.menu`, m)
        }
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|ttdl|tt|tiktokdl|tiktoknowm)$/i
handler.limit = true
module.exports = handler
