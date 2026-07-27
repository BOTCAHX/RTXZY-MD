import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/republika?apikey=${btc}`);
    let json = await res.json();
    let items = json.result.filter(i => i.berita && i.berita_url);
    let choice = pickRandom(items);
    let text = `―REPUBLIKA―\n\n*Judul*     : ${choice.berita}\n*URL*       : ${choice.berita_url}\n*Jenis*     : ${choice.berita_jenis || 'Tidak diketahui'}\n*Di upload* : ${choice.berita_diupload}`;
    if (choice.berita_thumb) {
      await conn.sendMessage(m.chat, { image: { url: choice.berita_thumb }, caption: text }, { quoted: m });
    } else {
      conn.reply(m.chat, text, m);
    }
  } catch (e) {
    throw eror
  }
};

handler.help = ['republika'];
handler.tags = ['news'];
handler.command = /^(republika)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
