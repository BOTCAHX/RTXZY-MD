let fetch = require('node-fetch');
let handler = async (m, { text, usedPrefix, command }) => {
  if (!text) throw `*Example:* ${usedPrefix + command} 112.90.150.204`;
  try {
    await m.reply(wait);
    let res = await fetch(`https://ipwho.is/${text}`).then(result => result.json());
    await conn.sendMessage(m.chat, { location: { degreesLatitude: res.latitude, degreesLongitude: res.longitude }},{ ephemeralExpiration: 604800 });
    await delay(2000);
    conn.reply(m.chat, JSON.stringify(res, null, 2), m);  
  } catch (e) { 
    throw { error: `IP ${text} not found!` };
  }
}
handler.command = handler.help = ['ip','ipwho'];
handler.tags = ['tools'];
handler.premium = false;
module.exports = handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
