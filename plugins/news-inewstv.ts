import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn }) => {
  try {
    let res = await fetch(`https://api.botcahx.eu.org/api/news/inews?apikey=${btc}`);
    let json = await res.json();
    let items = json.result.filter(item => item.berita && item.berita_url);
    let choice = pickRandom(items);
    let text = `―INEWSTV―\n\n*Judul*     : ${choice.berita}\n*URL*       : ${choice.berita_url}\n*Jenis*     : ${choice.berita_jenis || 'Tidak diketahui'}\n*Di upload* : ${choice.berita_diupload || 'Tidak diketahui'}`;
    if (choice.berita_thumb) {
      try {
        await conn.sendMessage(m.chat, { image: { url: choice.berita_thumb }, caption: text }, { quoted: m });
      } catch (e) {
        conn.reply(m.chat, text, m);
      }
    } else {
      conn.reply(m.chat, text, m);
    }
  } catch (e) {
    throw eror
  }
};

handler.help = ['inewstv'];
handler.tags = ['news'];
handler.command = /^(inewstv)$/i;
handler.group = false;
handler.limit = true;
export default handler;

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())];
}
