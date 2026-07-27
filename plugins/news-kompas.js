import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/kompas?apikey=${btc}`);
    let json = await res.json();
    let newsdata = json.result.map(item => {
      return {
        text: `―KOMPAS―\n\n*Judul*     : ${item.berita}\n*URL*       : ${item.berita_url}\n*Jenis*     : ${item.berita_jenis || 'Tidak diketahui'}`,
        thumb: item.berita_thumb || ''
      };
    });
    let choice = pickRandom(newsdata);
    await conn.sendMessage(
      m.chat,
      {
        image: { url: choice.thumb },
        caption: choice.text
      },
      { quoted: m }
    );
  } catch (e) {
    throw eror
  }
};

handler.help = ['kompas'];
handler.tags = ['news'];
handler.command = /^(kompas)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
