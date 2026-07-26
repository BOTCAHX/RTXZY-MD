import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/kontan?apikey=${btc}`);
    let json = await res.json();
    let newsdata = json.result.map(item => {
      return {
        text: `―KONTAN―

*Judul*     : ${item.berita}
*URL*       : ${item.berita_url}
*Jenis*     : ${item.berita_jenis || 'Tidak diketahui'}
*Di upload* : ${item.berita_diupload}`,
        thumb: item.berita_thumb
      };
    });
    let choice = pickRandom(newsdata);
    conn.sendFile(m.chat, choice.thumb, 'news.jpg', choice.text, m);
  } catch (e) {
    throw eror
  }
};

handler.help = ['kontan'];
handler.tags = ['news'];
handler.command = /^(kontan)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
