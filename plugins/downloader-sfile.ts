import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} https://sfile.mobi/P0D2WxqDwA7`;
    
    try {
        await m.reply(wait);
        let json = await fetch(`https://api.botcahx.eu.org/api/dowloader/sfilemobi?url=${text}&apikey=${btc}`).then(res => res.json());
        let res = json.result;
        
        let downloadUrl = res.direct || res.result || res.cdnDirect;
        let fileName = res.name || 'file';
        let mimeType = res.mime || 'application/octet-stream';
        
        let caption = `⦿  *S F I L E - D O W N L O A D E R*\n\n`;
        caption += `	◦  *Name* : ${res.name || 'N/A'}\n`;
        caption += `	◦  *User* : ${res.user || 'N/A'}\n`;
        caption += `	◦  *Date* : ${res.date || 'N/A'}\n`;
        caption += `	◦  *Size* : ${res.size || 'N/A'}\n`;
        caption += `	◦  *Downloads* : ${res.dlCount || '0'}\n`;
        caption += `	◦  *MIME* : ${res.mime || 'N/A'}\n\n`;
        
        await conn.sendMessage(m.chat, { 
            document: { url: downloadUrl }, 
            fileName: fileName, 
            mimetype: mimeType,
            caption: caption
        }, { quoted: m });
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['sfile <url>'];
handler.tags = ['downloader'];
handler.command = /^(sfile|sfilemobi)$/i;
handler.limit = true;

export default handler;
