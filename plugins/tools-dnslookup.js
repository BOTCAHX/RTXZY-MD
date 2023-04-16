/*
Thanks to https://api.hackertarget.com
by: TioXd 
*/

const fetch = require('node-fetch');

const handler = async (m, { text, usedPrefix, command }) => {
if (!text) throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* api.botcahx.biz.id`;

    if (text.includes('https://') || text.includes('http://')) throw `Tolong masukkan domain/sub domain secara lengkap. Contoh: api.botcahx.biz.id`;
  try {
    const res = await fetch(`https://api.hackertarget.com/dnslookup/?q=${text}`)
      .then(response => response.text())
      .then(data => {
        m.reply(`*Ini Adalah Hasil Dns Lookup Untuk ${text}:*\n${data}`);
        console.log(data);
      })
      .catch(error => console.error(error));

  } catch (error) {
    console.log(error);
    m.reply('*Invalid data!*');
  }
};

handler.command = ['dnslookup', 'hackertarget', 'lookup'];
handler.help = ['dnslookup', 'hackertarget', 'lookup'];
handler.tags = ['internet'];
handler.premium = false;
handler.limit = 10;
module.exports = handler;
