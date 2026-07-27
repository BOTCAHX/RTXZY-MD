import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/bbc?apikey=${btc}`);
    let json = await res.json();
    let newsdata = json.result.map(item => {
      return {
        text: `―BBC―\n\n*Judul*     : ${item.berita}\n*URL*       : ${item.berita_url}\n*Di upload* : ${item.berita_diupload || 'Tidak diketahui'}`,
        thumb: item.berita_thumb || ''
      };
    });
    let choice = pickRandom(newsdata);
    if (choice.thumb) {
      await conn.sendMessage(
        m.chat,
        { image: { url: choice.thumb }, caption: choice.text },
        { quoted: m }
      );
    } else {
      conn.reply(m.chat, choice.text, m);
    }
  } catch (e) {
    throw eror
  }
};

handler.help = ['bbc'];
handler.tags = ['news'];
handler.command = /^(bbc)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
