import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/metrotv?apikey=${btc}`);
    let json = await res.json();
    let newsdata = json.result.map(item => {
      return {
        text: `―METROTV―\n\n*Judul*     : ${item.berita}\n*URL*       : ${item.berita_url}`,
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

handler.help = ['metrotv'];
handler.tags = ['news'];
handler.command = /^(metrotv)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
