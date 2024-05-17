const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://v.douyin.com/ikq8axJ/`;    
    try {
        if (!text.match(/douyin/gi)) throw `URL Tidak Ditemukan!`;        
        m.reply(wait);      
        const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/douyin?url=${text}&apikey=${btc}`);        
        const res = response.data.result;      
        var { video, title, title_audio, audio } = res;
        let capt = `乂 *D O U Y I N*\n\n`;
        capt += `◦ *Title* : ${title}\n`;
        capt += `◦ *Audio* : ${title_audio}\n`;
        capt += `\n`;        
        await conn.sendFile(m.chat, video, null, capt, m);
        conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });         
    } catch (e) {
        console.log(e);
        throw `🚩 ${eror}`;
    }
};
handler.help = ['douyin'];
handler.command = /^(douyin)$/i;
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
