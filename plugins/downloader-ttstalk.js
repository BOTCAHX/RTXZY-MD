const api = require('api-dylux');

async function handler(m, { text, usedPrefix, command }) {
  if (!text) return m.reply(`Masukkan URL Instagram!\n\n*Contoh:* ${usedPrefix + command} chenggu_4 `);

  const maxAttempt = 3;
  let res, attempt = 0;

  const waitMessage = `Mohon tunggu sebentar.. Sedang mengumpulkan data.`;

  while (attempt < maxAttempt) {
    try {
      await m.reply(waitMessage);

      res = await api.ttStalk(text);

      const textMessage = `
👤 Nama: ${res.name}
📍 Username: ${res.username}
🔵 Pengikut: ${res.followers}
🔴 Mengikuti: ${res.following}
📖 Deskripsi: ${res.desc}
      `;

      conn.sendFile(m.chat, res.profile, 'prof.jpg', textMessage, m);
      break;
    } catch (error) {
      attempt++;
      m.reply(`Terjadi error, mencoba kembali.. (${attempt}/${maxAttempt})`);
      
      if (attempt === maxAttempt) {
        m.reply(`Gagal melakukan ttStalk: ${error}`);
      }
    }
  }
}

handler.command = ['tiktokstalk', 'ttstalk'];
handler.tags = ['downloader'];
handler.help = ['tiktokstalk <username>'];

module.exports = handler;