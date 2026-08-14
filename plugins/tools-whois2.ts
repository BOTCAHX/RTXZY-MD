import fetch from 'node-fetch';
const handler: WaPlugin = async (m, { text, usedPrefix, command }) => {
  if (!text) {
    throw `Masukkan Domain/Sub Domain!\n\n*Contoh:* botcahx.eu.org`;
  }
  if (text.includes('https://') || text.includes('http://')) {
    throw `Tolong masukkan domain/sub domain secara lengkap. Contoh: botcahx.eu.org`;
  }
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Token=6c7bd1ce704d92c90e2f78d42641a9ee0cbcef198a6ad62a3dd06deb22af6fd3' // replace this apikey when it runs out
    }
  };
  try {
    const response = await fetch(`https://whoisjson.com/api/v1/whois?domain=${text}`, options);
    const data = await response.json();
    m.reply(JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};
handler.command = ['whois2'];
handler.tags = ['internet'];
handler.premium = false;
export default handler;