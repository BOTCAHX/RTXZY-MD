import axios from 'axios';
var handler: WaPlugin = async (m, { conn }) => {
try {
  var response = await axios.get(`https://api.botcahx.eu.org/api/search/gempa?apikey=${btc}`);
  var dataGempa = response.data.result.result;
  var caption = `Waktu : ${dataGempa.waktu}\nLintang : ${dataGempa.Lintang}\nBujur : ${dataGempa.Bujur}\nMagnitude : ${dataGempa.Magnitudo}\nKedalaman : ${dataGempa.Kedalaman}\nWilayah : ${dataGempa.Wilayah}`;
  conn.sendFile(m.chat, dataGempa.image, 'map.png', caption, m);
} catch(e) {
  console.log(e);
  conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data gempa', m);
}
};
handler.command = handler.help = ['infogempa', 'gempa'];
handler.tags = ['info'];
handler.premium = false;
handler.limit = true;
export default handler;
