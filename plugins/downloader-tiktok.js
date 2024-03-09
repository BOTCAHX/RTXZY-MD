const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`;    
    try {
        if (!text.match(/tiktok/gi)) throw `URL Tidak Ditemukan!`;        
        m.reply(wait);      
        const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${text}&apikey=${btc}`);        
        const res = response.data.result;      
        var { video, title, title_audio, audio } = res;
        let capt = `乂 *T I K T O K*\n\n`;
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
handler.help = ['tiktok'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i
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
