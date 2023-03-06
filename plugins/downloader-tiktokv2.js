var fetch = require("node-fetch");
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`

var anu = await fetch(`https://api.botcahx.xyz/api/download/tiktok?url=${text}&apikey=Admin`)
var con = await anu.json()
var parse = con.result.video.no_watermark
conn.sendFile(m.chat, parse, 'tiktok.mp4', 'Nih..', m)
    };  
handler.command = handler.help = ['tiktokv2'];
handler.tags = ['internet'];
module.exports = handler;
