let fetch = require('node-fetch');
let handler = async (m, { text, conn, usedPrefix, command }) => {
  if (!text) throw `*🚩 Contoh:* ${usedPrefix + command} https://donghua.web.id/throne-of-seal/`;
  let teks = '';
  try {
        const api = await fetch(`https://api.botcahx.live/api/download/donghua?url=https://donghua.web.id/throne-of-seal/&apikey=${btc}`);
        let json = await api.json();
        let res = json.result.data;
        teks += `*Title :* ${res.title}\n`;
        teks += `*Status:* ${res.status}\n`; 
        teks += `*Genre :* ${res.genre}\n`;
        teks += `*Release:* ${res.release}\n`; 
        teks += `*Duration :* ${res.duration}\n`;
        teks += `*Type :* ${res.type}\n`;
        teks += `*Episode :* ${res.episode}\n`;
        teks += `*Author :* ${res.author}\n`;
        teks += `*Update :* ${res.updated}\n`;
        teks += `*Rating :* ${res.rating}\n`; 
        for (let i in json.result.data.episodes) {
        let episode = json.result.data.episodes[i];
        teks += `*Eps :* ${episode.eps}\n`;
        teks += `*Title :* ${episode.title}\n`;
        teks += `*Release :* ${episode.release}\n\n`;
        teks += `*Url :* ${episode.url}\n`;
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
            thumbnailUrl: json.result.data.thumbnail,
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

handler.command = handler.help = ['donghuaurl'];
handler.tags = ['internet'];
handler.premium = false;
handler.group = false;
handler.limit = true

module.exports = handler;
