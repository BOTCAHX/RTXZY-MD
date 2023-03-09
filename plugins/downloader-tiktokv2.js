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
 var tioxd = await nodeF(`https://api.botcahx.biz.id/api/dowloader/tikok?url=${args[0]}&apikey=Admin`)
if (!tioxd.ok) throw await tioxd.text()
var tiodl = await tioxd.json()
if (!tiodl.status) throw tiodl
var { 
video, 
video2, 
username,
description,
audio
} = tiodl.result
await conn.sendFile(m.chat, video, 'tiovid.mp4', `
*Deskripsi*: ${description}
\n*Username*: ${username}`, m, false, { contextInfo: { forwardingScore: 999, isForwarded: true }})

conn.sendFile(m.chat, audio, 'tok2.opus', null, m)
};
handler.command = handler.help = ['tiktokdl2'];
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
