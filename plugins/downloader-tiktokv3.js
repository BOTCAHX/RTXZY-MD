var nodeF = require("node-fetch");
var handler = async (m, {
	conn,
	args,
	usedPrefix,
	command
}) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`
if (!args[0].match(/tiktok/gi)) throw `URL Tidak Ditemukan!`
m.reply('*Please wait..*.')
 var tioxd = await nodeF(`https://api.ibeng.tech/api/download/tiktok?url=${args[0]}&apikey=ibeng`)
if (!tioxd.ok) throw await tioxd.text()
var tiodl = await tioxd.json()
if (!tiodl.status) throw tiodl
var { 
video, 
description, 
username } = tiodl.result
await conn.sendFile(m.chat, video, 'tiovid.mp4', `
*Deskripsi*: ${description}
\n*Username*: ${username}`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})
};
handler.command = handler.help = ['tiktokdl3'];
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
