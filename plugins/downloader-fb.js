var fetch = require("node-fetch");
var handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0]) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://www.facebook.com/100084756252836/videos/3391018171153874/?idorvanity=2765173437119338&mibextid=rS40aB7S9Ucbxw6v`;
  try {
    m.reply('*Please wait..*');
    var get = await fetch(`https://api.botcahx.live/api/dowloader/fbdown?url=${args[0]}&apikey=QaepQXxR`);
var js = await get.json()   
conn.sendFile(m.chat, js.result.HD, 'fb.mp4', '', m);
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    }
  }
};
handler.help = ['facebook'];
handler.command = /^(fb|facebook|facebookdl|fbdl|fbdown|dlfb)$/i;
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