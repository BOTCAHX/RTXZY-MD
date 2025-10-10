let fetch = require('node-fetch');

let handler = async (m, { conn, command }) => {
  try {
    await m.reply(wait)

    if (command == 'checkapi' || command == 'api') {
      let api = await fetch(`https://api.botcahx.eu.org/api/checkkey?apikey=${btc}`);
      let body = await api.json();
      let { 
        email, 
        username, 
        limit, 
        premium, 
        expired, 
        todayHit,
        totalHit
      } = body.result;
      
      let capt = `乂 *C H E C K   A P I K E Y*\n\n`;
      capt += `◦ *Email*: ${email}\n`;
      capt += `◦ *Username*: ${username}\n`;
      capt += `◦ *Limit*: ${limit}\n`;
      capt += `◦ *Premium*: ${premium}\n`;
      capt += `◦ *Expired*: ${expired}\n`;
      capt += `◦ *Today Hit*: ${todayHit}\n`;
      capt += `◦ *Total Hit*: ${totalHit}\n\n`;
      await conn.reply(m.chat, capt, m);
    }

    if (command == 'cekakseskey' || command == 'akseskey') {
      let api = await fetch(`https://api.botcahx.eu.org/api/cek-aksesKey?aksesKey=${aksesKey}`);
      let body = await api.json();
      let { 
        limit,
        usageCount,
        expired,
        type
      } = body.data;
      
      let capt = `乂 *C H E C K   A K S E S K E Y*\n\n`;
      capt += `◦ *Type*: ${type}\n`;
      capt += `◦ *Limit*: ${limit}\n`;
      capt += `◦ *Usage Count*: ${usageCount}\n`;
      capt += `◦ *Expired*: ${expired}\n\n`;
      await conn.reply(m.chat, capt, m);
    }

  } catch (e) {
    throw eror
  }
};

handler.command = handler.help = ['checkapi', 'api', 'cekakseskey', 'akseskey'];
handler.tags = ['main'];
handler.owner = true;

module.exports = handler;
