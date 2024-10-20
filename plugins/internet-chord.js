let fetch = require('node-fetch');

let handler = async (m, { text, command, usedPrefix }) => {
	if (!text) throw `Example: ${usedPrefix + command} Janji Suci Yovie Nuno`
	m.reply(wait)
	const fetch = require('node-fetch');
  try {
    let response = await fetch(`https://api.botcahx.eu.org/api/search/chord?song=${text}&apikey=${btc}`);
    let data = await response.json();

    if (data.status && data.result) {
        let txt = `乂 *C H O R D  M U S I C*\n\n`;
        txt += `◦ *Title:* ${data.result.title ? data.result.title : text}\n`;
        txt += `◦ *Chord:* ${data.result.chord ? data.result.chord : 'Tidak ditemukan!'}\n\n`;
        text += `\n`;
        await m.reply(txt);
    } else {
        await m.reply('Lagu tidak ditemukan!')
    }
  } catch (error) {
    throw eror
 }
}

handler.help = ['chord <judul lagu>']
handler.tags = ['internet']
handler.command = /^(chord)$/i
handler.limit = true
module.exports = handler
