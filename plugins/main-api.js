var fetch = require("node-fetch")
var handler = async (m, { text }) => {
var link = await fetch(`https://api.tiodevhost.my.id/statistic`)
 hasil = await link.json()
 var stat = `
*REST API STAT*
*Status:* ${hasil.status}
*Creator:* ${hasil.creator}
*Runtime Web:* ${hasil.runtime}
*Visitor:* ${hasil.visitor}`
conn.send3But(m.chat, stat, wm, `Visitor | ${hasil.visitor}`, `null`, `Status | ${hasil.status}`, `null`, `Uptime | YTDL`, `.khususytdl https://ytdl.tiodevhost.my.id/uptime`, m)
    };  
handler.command = handler.help = ['api'];
handler.tags = ['main'];
module.exports = handler;
