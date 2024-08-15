let fetch = require('node-fetch');

let handler = async (m, { command }) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear(); 
  m.reply(wait);
  try {
    let res = await (await fetch(`https://widipe.com/kalender?bulan=${month}&tahun=${year}`)).json();
    let content = `*L I B U R   N A S I O N A L*\n\n`;

    if (res.status) {
      if (res.result && res.result.length > 0) {
        const holiday = res.result[0];
        content += `  ◦ *Tanggal:* ${holiday.holiday_date}\n`;
        content += `  ◦ *Nama Libur:* ${holiday.holiday_name}\n`;
        content += `  ◦ *Hari Nasional:* ${holiday.is_national_holiday ? 'Ya' : 'Tidak'}\n`;
      } else {
        content += 'Data libur tidak ditemukan.';
      }
    } else {
      content += 'Gagal mengambil data.';
    }

    await m.reply(content);

  } catch (error) {
    throw eror;
  }
};

handler.command = handler.help = ['libur', 'liburnasional']
handler.tags = ['tools'];
handler.limit = true;

module.exports = handler;
