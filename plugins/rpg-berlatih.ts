// Convert time to hours:minutes:seconds format
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

let handler: WaPlugin = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender];
    
    const attributes = ['attack', 'speed', 'strength', 'health', 'defense'];

    let attribute = text.toLowerCase().trim();
    if (!attributes.includes(attribute)) {
        conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg' }, caption: `乂 *B E R L A T I H*\n\nSilahkan pilih *Attribute* yang kamu ingin latih :\n\n- Attack\n- Speed\n- Strenght\n- Health\n- Defense\n\n_Example_ :\n.berlatih defense`, mentions: [m.sender] }, { quoted: m });
      return;
    }

    if (user.stamina < 10) {
      conn.reply(m.chat, '🌡️ Anda tidak memiliki cukup stamina untuk berlatih. Stamina dibutuhkan: 10.', m);
      return;
    }

    user.stamina -= 10;

    let increase = 1;

    user[attribute] += increase;

    let message = `🏋️‍♂️ Anda sedang berlatih ${attribute} dan mendapatkan peningkatan:\n\n`;
    message += `❤️ ${attribute} pengguna sekarang: ${user[attribute]}\n`;
    message += `✨ Peningkatan yang dihasilkan: ${increase}\n`;
    message += `⚡ Sisa stamina: ${user.stamina}\n`;

        conn.sendMessage(m.chat, { image: { url: 'https://telegra.ph/file/05daab7b42157c06636b3.jpg' }, caption: message, mentions: [m.sender] }, { quoted: m });
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
handler.rpg = true
handler.fail = null;

export default handler;
