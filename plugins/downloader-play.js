const { youtubeSearch } = require('@bochilteam/scraper');
const { ytmp3 } = require('../scraper/yt')
const key = global.btc;
const fetch = require('node-fetch');

const handler = async (m, { conn, text, usedPrefix }) => {
  if (!text) throw 'Enter Title / link';
  try {
    const vid = (await youtubeSearch(text)).video[0];
    if (!vid) throw 'Video/Audio Tidak Ditemukan';
    const {
      title,
      description,
      thumbnail,
      videoId,
      durationH,
      durationS,
      viewH,
      publishedTime,
    } = vid;
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    const _  = await ytmp3(url)
    const tmb = thumbnail;
    const captionvid = `  ∘ Title: ${title}
  ∘ Published: ${publishedTime}
  ∘ Duration: ${durationH}
  ∘ Second: ${durationS}
  ∘ Views: ${viewH}  
  ∘ Url:  ${url}
  ∘ Description: ${description}`;
    const pesan = await conn.sendFile(m.chat, tmb, null, captionvid, m)
    if (durationS > 18000)
      return conn.sendMessage(m.chat, {
        text: `*Source Video:* ${await cut(url)}\n\n_Durasi terlalu panjang..._`,
      }, {
        quoted: pesan,
      });
    conn.sendMessage(m.chat, {
      audio: {
        url: _.url,
      },
      mimetype: 'audio/mpeg',
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "",
          thumbnailUrl: tmb,
          sourceUrl: url,
          mediaType: 1,
          showAdAttribution: true,
          renderLargerThumbnail: true,
        },
      },
    }, {
      quoted: pesan,
    });
  } catch (e) {
    throw 'Video/Audio Tidak Ditemukan';
  }
};

handler.command = handler.help = ['play', 'song', 'youtube', 'ytmp3', 'ds', 'downloadyt', 'yta'];
handler.tags = ['downloader'];
handler.exp = 0;
handler.limit = true;
handler.premium = false;
module.exports = handler;

async function cut(url) {
  url = encodeURIComponent(url);
  const response = await fetch(`https://api.botcahx.live/api/linkshort/bitly?link=${url}&apikey=${key}`);
  if (!response.ok) throw false;
  return await response.text();
}
          
