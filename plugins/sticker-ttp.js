const { sticker5 } = require('../lib/sticker');
const fetch = require('node-fetch');

var handler = async (m, { 
conn, 
text, 
command 
}) => {
  var teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : m.text
  if (/^ttp?$/i.test(command)) {
    let stiker = await sticker5(null, API('https://api.tiodevhost.my.id', '/api/maker/ttp', { file: '', text: teks }), packname, author)
    if (stiker) return await conn.sendFile(m.chat, stiker, '', '', m)
    throw stiker.toString()
  }
};
handler.command = handler.help = ['ttp'];
handler.tags = ['sticker'];
handler.limit = true;
module.exports = handler;
