const fetch = require("node-fetch");
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `Masukkan Domain!\n\n*Contoh:* botcahx.eu.org`;
  if (text.includes('https://') || text.includes('http://')) throw `Tolong masukkan tanpa domain *https/http!*. Contoh: botcahx.eu.org`;  

  try {
    const waiting = `_Sedang mencari informasi Subdomain untuk ${text}..._`;
    m.reply(waiting);    
    let data = await fetch(`https://api.botcahx.eu.org/api/tools/subdomain-finder?query=${text}&apikey=${btc}`)
    .then(result => result.json())
    .then(response => {
      if (response.status && response.code === 200) {
        let subdomains = response.result;
        let message = `Subdomain untuk ${text}:\n\n` + subdomains.map((sub, i) => `${i + 1}. ${sub}`).join('\n');
        m.reply(message);
      } else {
        m.reply('Terjadi kesalahan saat mengambil data subdomain. Silakan coba lagi nanti.');
      }
    })
    .catch(error => {
      m.reply('Terjadi error saat mencari informasi Subdomain, silakan coba lagi nanti');
    });
  } catch (error) {
    m.reply('Terjadi error saat mencari informasi Subdomain, silakan coba lagi nanti');
  }
};

handler.command = ['subdomainfinder', 'subfinder'];
handler.help = ['subdomainfinder', 'subfinder'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;
module.exports = handler;
