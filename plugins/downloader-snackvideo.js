const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://s.snackvideo.com/p/j9jKr9dR`;    
    try {
        if (!text.match(/snackvideo/gi)) throw `URL Tidak Ditemukan!`;        
        m.reply(wait);      
        const response = await axios.get(`https://api.botcahx.eu.org/api/download/snackvideo?url=${text}&apikey=${btc}`);        
        const res = response.data.result;      
        var { 
          media, 
          title, 
          thumbnail, 
          authorImage, 
          author,  
          like,
          comment,
          share
        } = res;
        let capt = `乂 *S N A C K   V I D E O*\n\n`;
        capt += `◦ *Title* : ${title}\n`;
        capt += `◦ *Author* : ${author}\n`;
        capt += `◦ *Like* : ${like}\n`;
        capt += `◦ *comment* : ${comment}\n`;
        capt += `◦ *Share* : ${share}\n`;
        capt += `\n`;        
        await conn.sendFile(m.chat, media, null, capt, m);
    } catch (e) {
        throw eror
    }
};
handler.command = handler.help = ['snackvideo'];
handler.tags = ['downloader'];
handler.limit = true;

module.exports = handler;
