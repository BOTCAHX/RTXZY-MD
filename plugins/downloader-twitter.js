var nodeF = require("node-fetch");
var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://twitter.com/gofoodindonesia/status/1229369819511709697`
if (!args[0].match(/twitter/gi)) throw `URL Tidak Ditemukan!`
m.reply('*Please wait..*.')
 var tioxd = await nodeF(`https://api.tiodevhost.my.id/api/dowloader/twitter?url=${args[0]}`)
if (!tioxd.ok) throw await tioxd.text()
var tiodl = await tioxd.json()
if (!tiodl.status) throw tiodl
var { 
desc, 
HD } = tiodl.result
await conn.sendFile(m.chat, HD, 'tiovid.mp4', `
*Deskripsi*: ${desc}`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
};
handler.command = handler.help = ['twitter'];
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;
