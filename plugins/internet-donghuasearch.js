let fetch = require('node-fetch');
let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} throne of seal`;  
  let teks = '';
    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/webzone/donghua?query=${text}&apikey=${btc}`);
        let json = await api.json();
        let res = json.result.data;
        for (let i in res) {
          teks += `*Title :* ${res[i].title}\n`;
          teks += `*Status:* ${res[i].status}\n`;
          teks += `*Type :* ${res[i].type}\n`;
          teks += `*Url :* ${res[i].url}\n`;
        }      
        await conn.relayMessage(m.chat, {
          extendedTextMessage: {
            text: teks,
            contextInfo: {
              externalAdReply: {
                title: 'D O N G H U A',
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJSGLPaVlwA8hyQ2LKCmFrqZE9cMNbkQ_fVw&usqp=CAU',
                sourceUrl: '' 
              }
            },
            mentions: [m.sender]
          }
        }, {});
  } catch (e) {
    throw `🚩 *Gagal Memuat Data!*`;
  }
};

handler.command = handler.help = ['donghuasearch'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true

module.exports = handler;
