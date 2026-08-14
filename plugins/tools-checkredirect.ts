import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan URL yang ingin diperiksa!\n\n*Contoh:* ${usedPrefix + command} https://tinyurl.com/bdtf7se9`;

  try {
    await m.reply(wait);
    let res = await (await fetch(`https://api.botcahx.eu.org/api/tools/cekredirect?url=${text}&apikey=${btc}`)).json();

    if (!res.status || !res.result) throw 'Gagal mendapatkan data!';

    let message = res.result.map((item, index) => 
      `🔗 *URL*: ${item.url}\n🚦 *Status*: ${item.status || 'Tidak ada status'}`
    ).join('\n\n');

    await m.reply(message);
  } catch (e) {
    console.error(e);
    throw 'Terjadi kesalahan saat memproses permintaan!';
  }
};

handler.command = handler.help = ['checkredirect', 'cekredirect'];
handler.tags = ['tools'];
handler.limit = true;

export default handler;
