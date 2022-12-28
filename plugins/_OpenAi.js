/**apikey ini punya orang jadi nanti
 kalo abis kalian beli aja sendiri 
atau cari**/

var tiodev = require("node-fetch")
var handler = async (m, {
 text, 
 usedPrefix, 
 command
 }) => {
    if (!text) throw `Contoh:\n${usedPrefix + command} berikan contoh kode html`

var tiores = await tiodev(`https://api.lolhuman.xyz/api/openai?apikey=SGWN&text=${text}&user=user-unique-id`)
 hasil = await tiores.json()
 m.reply(`${hasil.result}`.trim())
    };  
handler.command = handler.help = ['ai'];
handler.tags = ['internet'];
module.exports = handler;
