import axios from 'axios';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Example: ${usedPrefix + command} https://v.kuaishou.com/KT2lZm23`;
    
    try {
        await m.reply(wait);
        let old = Date.now();
        const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/kuaishou?url=${text}&apikey=${btc}`);
        let res = response.data.result;
        
        let capt = `乂 *K U A I S H O U*\n\n`;
        capt += `◦ *Title* : ${res.title || 'Not available'}\n`;
        capt += `◦ *Author* : ${res.author || 'Not available'}\n`;
        capt += `◦ *Username* : ${res.username || 'Not available'}\n`;
        capt += `◦ *Likes* : ${res.likeCount || 0}\n`;
        capt += `◦ *Comments* : ${res.commentCount || 0}\n`;
        capt += `◦ *Views* : ${res.viewCount || 0}\n`;
        capt += `◦ *Duration* : ${res.duration ? res.duration / 1000 + ' seconds' : 'Not available'}\n`;
        capt += `◦ *🍟 Fetching* : ${((Date.now() - old) * 1)} ms\n`;
        capt += `\n`;
        
        if (res.videoUrl) {
            await conn.sendFile(m.chat, res.videoUrl, null, capt, m);
        } else {
            throw 'Video not found';
        }
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['kuaishou <url>'];
handler.tags = ['downloader'];
handler.command = /^(kuaishou|ks)$/i;
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler;
