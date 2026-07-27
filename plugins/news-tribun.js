import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/tribun?apikey=${btc}`);
    let json = await res.json();
    let newsdata = json.result.map(item => {
      return {
        text: `―TRIBUN―\n\n*Judul*     : ${item.berita}\n*URL*       : ${item.berita_url}\n*Jenis*     : ${item.berita_jenis || 'Tidak diketahui'}\n*Di upload* : ${item.berita_diupload}`,
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

handler.help = ['tribun'];
handler.tags = ['news'];
handler.command = /^(tribun)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
