// Fungsi untuk mengubah waktu menjadi format jam:menit:detik
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

let handler = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender];
    
    // Daftar atribut yang bisa dilatih
    const attributes = ['attack', 'speed', 'strength', 'health', 'defense'];

    // Cek apakah atribut yang diminta valid
    let attribute = text.toLowerCase().trim();
    if (!attributes.includes(attribute)) {
      conn.reply(m.chat, `乂 *B E R L A T I H*\n\nSilahkan pilih *Attribute* yang kamu ingin latih :\n\n- Attack\n- Speed\n- Strenght\n- Health\n- Defense\n\n_Example_ :\n.berlatih defense`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'BETABOTZ RPG',
                    thumbnailUrl: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
      return;
    }

    // Cek apakah pengguna memiliki cukup stamina
    if (user.stamina < 10) {
      conn.reply(m.chat, '🌡️ Anda tidak memiliki cukup stamina untuk berlatih. Stamina dibutuhkan: 10.', m);
      return;
    }

    // Kurangi stamina pengguna
    user.stamina -= 10;

    // Hitung peningkatan atribut
    let increase = 1; // Tetap menambahkan 1 ke atribut

    // Tambahkan peningkatan ke atribut yang diminta
    user[attribute] += increase;

    // Pesan hasil latihan
    let message = `🏋️‍♂️ Anda sedang berlatih ${attribute} dan mendapatkan peningkatan:\n\n`;
    message += `❤️ ${attribute} pengguna sekarang: ${user[attribute]}\n`;
    message += `✨ Peningkatan yang dihasilkan: ${increase}\n`;
    message += `⚡ Sisa stamina: ${user.stamina}\n`;

    conn.reply(m.chat, message, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'BETABOTZ RPG',
                    thumbnailUrl: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        })
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'Error', m);
  }
}

handler.help = ['berlatih <atribut>'];
handler.tags = ['rpg'];
handler.command = /^berlatih$/i;
handler.limit = true;
handler.group = true;
handler.fail = null;

module.exports = handler;