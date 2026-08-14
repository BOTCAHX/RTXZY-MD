import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { text, usedPrefix, command }) => {
  if (!text) throw(`Masukkan prompt lirik!\nContoh: ${usedPrefix + command} salahkah aku`);    

  try {
    m.reply(`⏳ Tunggu sebentar, sedang membuat lirik...`);

    const url = `https://api.botcahx.eu.org/api/maker/generateLirik?prompt=${encodeURIComponent(text)}&aksesKey=${aksesKey}`;
    const res = await fetch(url);
    const json = await res.json();

    if (!json.status || !json.result || !Array.isArray(json.result)) {
      throw new Error('Gagal mendapatkan lirik.');
    }

    const jumlahLirik = json.result.length;

    for (let i = 0; i < jumlahLirik; i++) {
      const lirik = json.result[i].text;
      await m.reply(lirik);
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Terjadi kesalahan saat membuat lirik.');
  }
};

handler.command = handler.help = ['aimusiclyrics', 'ailirik', 'lyricsgen'];
handler.tags = ['ai'];
handler.owner = false;
handler.limit = true;
handler.group = false;
handler.private = false;

export default handler;
