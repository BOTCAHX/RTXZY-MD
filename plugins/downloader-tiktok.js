/**Coba aja dlu gua bingung mau pake scraper suka error makanya 
Coba pake apikey malesin dlu wkwk**/

//let https = require('axios')
//let handler = async (m, { conn, args, usedPrefix, command }) => {
//if (!args[0]) throw `contoh:\n ${usedPrefix}${command} https://vm.tiktok.com/ZGJAmhSrp/`
//let tio = (await https.get(API('males', '/tiktok', { url: args[0] } ))).data;
//if (tio.status != 200) throw tio.message;
//if (!tio) throw tio.message;
// let hasilnya = `*Title:* ${tio.title}\n\n*Author:* ${tio.author}`
//  conn.sendButtonVid(m.chat, tio.video, hasilnya, wm, `Back`, `.menu`, m)
//        }
//handler.help = ['tiktok'].map(v => v + ' <url>')
//handler.tags = ['downloader']
//handler.command = /^(tiktok|ttdl|tt|tiktokdl|tiktoknowm)$/i
//handler.limit = true
//module.exports = handler

let tio = require('node-fetch')
let handler = async (m, { conn, args }) => {
if (!args[0]) throw 'Contoh:\n.tiktok https://vm.tiktok.com/ZGJAmhSrp/'
m.reply('Fetching data from node-fetch...')
let tioxd = await tio(`https://api.ibengtools.my.id/api/download/tiktok?url=${args[0]}&apikey=ibeng`)
if (!tioxd.ok) throw await tioxd.text()
let tiodl = await tioxd.json()
if (!tiodl.status) throw tiodl
let { video, description, username } = tiodl.result
await conn.sendFile(m.chat, video, 'tiovid.mp4', `
*Deskripsi*: ${description}
\n*Username*: ${username}`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
}
handler.help = ['tiktok <url>']
handler.tags = ['downloader']
handler.command = /^(tiktok|tt|ttdl|tiktoknowm|ttvid|tiktod)$/i
handler.limit = true
module.exports = handler
