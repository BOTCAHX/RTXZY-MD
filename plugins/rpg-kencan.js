let handler = async (m, { conn, text }) => {
  const userId = m.sender;
  const user = global.db.data.users[userId];
  const lastDate = user.lastdate || 0;
  const currentTime = new Date().getTime();
  const timeDiff = currentTime - lastDate;

  if (timeDiff < 600000) {
    const remainingTime = 600000 - timeDiff;
    conn.reply(m.chat, `Anda harus menunggu ${remainingTime / 1000} detik lagi sebelum berkencan lagi. ⏳`, m);
    return;
  }

  if (text) {
    const selectedCharacterIndex = parseInt(text) - 1;
    const characterOptions = getCharacterOptions();

    if (selectedCharacterIndex >= 0 && selectedCharacterIndex < characterOptions.length) {
      const selectedCharacter = characterOptions[selectedCharacterIndex];
      const partnerName = selectedCharacter;
      const dateLocation = generateRandomLocation();
      const dateInfo = `
💑 *Informasi Kencan* 💑
👤 Nama Pasangan: ${partnerName}
📍 Tempat Kencan: ${dateLocation}
      `;

      setTimeout(() => {
        let ending = "Akhir yang Bahagia";
        conn.reply(m.chat, `Kencan selesai!\n\n${dateInfo}\n\n${ending}`, m);
      }, 30000);

      conn.reply(m.chat, `Anda sedang berkencan dengan ${partnerName}!\n\n${dateInfo}`, m);

      user.lastdate = currentTime;
    } else {
      conn.reply(m.chat, 'Pilihan karakter tidak valid. Berkencan dibatalkan.', m);
    }
  } else {
    const characterList = getCharacterOptions().map((char, index) => `${index + 1}. ${char}`).join('\n');
    conn.reply(m.chat, `Silakan pilih karakter dengan format .kencan [nomor karakter].\n\nList Karakter:\n${characterList}`, m);
  }
};

handler.help = ['kencan'];
handler.tags = ['rpg'];
handler.command = /^kencan$/i;
handler.register = true;
handler.group = true;

module.exports = handler;

function getCharacterOptions() {
  return [
    'Sakura', 'Asuna', 'Mikasa', 'Kagome', 'Saber',
    'Rei', 'Rem', 'Mio', 'Erza', 'Haruhi',
    'Lucy', 'Nami', 'Hinata', 'Rias', 'Rukia',
    'Inori', 'Zero Two', 'Nanami', 'Nezuko', 'Holo', 'Axel',
  ];
}

function generateRandomLocation() {
  const locations = ['Taman', 'Pantai', 'Kafe', 'Museum', 'Bioskop', 'Restoran Mewah', 'Pasar Malam', 'Taman Air', 'Pusat Perbelanjaan', 'Tempat Karaoke', 'nightclub', 'oyo'];
  return locations[Math.floor(Math.random() * locations.length)];
}