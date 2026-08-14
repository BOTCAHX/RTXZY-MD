import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} Happy Mod`;
    
    try {
        await m.reply(wait);
        let json = await fetch(`https://api.botcahx.eu.org/api/search/sfilemobi?text1=${encodeURIComponent(text)}&apikey=${btc}`).then(res => res.json());
        let res = json.result;
        
        if (!res.result || res.result.length === 0) throw 'No files found';
        
        let caption = `⦿  *S F I L E - S E A R C H*\n\n`;
        caption += `	◦  *Query* : ${text}\n`;
        caption += `	◦  *Total* : ${res.total || 0} files\n\n`;
        
        let files = res.result.slice(0, 10);
        files.forEach((file, index) => {
            caption += `	➠ *${index + 1}. ${file.title || 'N/A'}*\n`;
            caption += `	◦  *Size* : ${file.size || 'N/A'}\n`;
            caption += `	◦  *Date* : ${file.date || 'N/A'}\n`;
            caption += `	◦  *Link* : ${file.link || 'N/A'}\n\n`;
        });
        
        if (res.total > 10) {
            caption += `	🔍 *Showing 10 of ${res.total} files*`;
        }
        
        await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['sfilesearch <query>'];
handler.tags = ['tools'];
handler.command = /^(sfilesearch|carisfile)$/i;
handler.limit = true;

export default handler;
