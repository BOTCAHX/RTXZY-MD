const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan Url Dari, youtube, twitter, facebook, dll\n\n*Example:* ${usedPrefix + command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`;    
    try {
        m.reply(wait);      
        let old = new Date();
        const response = await axios.get(`https://api.botcahx.eu.org/api/download/allin?url=${text}&apikey=${btc}`);        
        let res = response.data.result.medias.map(({url}) => url);
        let capt = `乂 *A I O  D L*\n\n`;
        capt += `◦ *🍟 Fetching* : ${((new Date - old) * 1)} ms\n`;
        capt += `\n`; 
        const jumlahTotal = res.length;
        if (jumlahTotal > 0) {
       	for (let i = 0; i < jumlahTotal; i++) {
        await conn.sendFile(m.chat, res[i], null, capt, m);                	
        }
      }                       
    } catch (e) {
        console.log(e);
        throw eror
    }
};
handler.help = handler.command = ['dl', 'alldl', 'aiodl', 'aio'];
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
