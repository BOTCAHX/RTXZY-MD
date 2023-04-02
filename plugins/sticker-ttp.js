const { sticker5 } = require('../lib/sticker');
const api = require('api-dylux');
async function handler(m, {
 text, 
 usedPrefix, 
 command
 }) {   
  if (!text) throw `Tolong berikan Text!\n\n*Example:* ${ usedPrefix + command} hai guys`
  await m.reply(wait)
  api.ttp(text)
    .then((res) => {
      return sticker5(res.result, { packname });
    })
    .then((stikk) => { 
    conn.sendFile(m.chat, stikk, 'ttp.webp', '', m);
    })
    .catch((err) => {
      console.error(err);
    });     
}        
handler.command = handler.help = ['ttp','ttpsticker'];
handler.tags = ['sticker'];
module.exports = handler;
