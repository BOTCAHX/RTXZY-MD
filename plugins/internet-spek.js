let fetch = require('node-fetch');

let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} Vivo`;  
  let teks = '';
    try {
        const api = await fetch(`https://api.botcahx.eu.org/api/webzone/gsmarena?query=${text}&apikey=${btc}`);
        let json = await api.json();
        let res = json.result.fitur;
        for (let i in res) {
          teks += `${res[i].desc}\n`;
        }
        for (let i in json.result.spek) {
          let spec = json.result.spek[i];
          teks += `${spec.name}\n`;
          teks += `*Specification :* ${spec.fitur}\n\n`;
        }
        teks += `*Priview :* ${json.result.img}\n\n`;
        await conn.relayMessage(m.chat, {
          extendedTextMessage: {
            text: teks,
            contextInfo: {
              externalAdReply: {
                title: 'DEVICE INFORMATION',
                mediaType: 1,
                previewType: 0,
                renderLargerThumbnail: true,
                thumbnailUrl: json.result.img,
                sourceUrl: json.result.img 
              }
            },
            mentions: [m.sender]
          }
        }, {});
  } catch (e) {
    throw `🚩 *Gagal Memuat Data!*`;
  }
};

handler.command = handler.help = ['spek','gsmarena','spesifikasi'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true

module.exports = handler;
