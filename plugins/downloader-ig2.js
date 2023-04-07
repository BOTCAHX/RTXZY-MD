const api = require('api-dylux');
async function handler(m, {
 text, 
 usedPrefix, 
 command
 }) {   
  if (!text) throw `Masukan URL Instagram!\n\n*Example:* ${ usedPrefix + command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link `
  await m.reply(wait)
  api.igdl(text)
  .then(res => conn.sendFile(m.chat, res.url_list, 'igdl.mp4', '', m))
  .catch(console.error);
}        
handler.command = handler.help = ['ig2','igdl2'];
handler.tags = ['downloader'];
module.exports = handler;
