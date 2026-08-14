import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `*Example:* ${usedPrefix + command} ju jingyi`;
    
    try {
        await m.reply(wait);
        let json = await fetch(`https://api.botcahx.eu.org/api/search/douyin?query=${encodeURIComponent(text)}&apikey=${btc}`).then(res => res.json());
        let res = json.result;
        
        if (!res.videos || res.videos.length === 0) throw 'No videos found';
        
        let caption = `⦿  *D O U Y I N - S E A R C H*\n\n`;
        caption += `	◦  *Query* : ${res.query || 'N/A'}\n`;
        caption += `	◦  *Total* : ${res.total || 0} videos\n\n`;
        
        let list = res.videos.slice(0, 5);
        list.forEach((video, index) => {
            caption += `	➠ *Video ${index + 1}*\n`;
            caption += `	◦  *ID* : ${video.id || 'N/A'}\n`;
            caption += `	◦  *Author* : ${video.author || 'N/A'}\n`;
            caption += `	◦  *Likes* : ${video.stats?.likes || 0}\n`;
            caption += `	◦  *Comments* : ${video.stats?.comments || 0}\n`;
            caption += `	◦  *Shares* : ${video.stats?.shares || 0}\n`;
            caption += `	◦  *Views* : ${video.stats?.views || 0}\n`;
            caption += `	◦  *URL* : ${video.url || 'N/A'}\n`;
            caption += `	◦  *Description* : ${video.desc ? video.desc.slice(0, 100) + (video.desc.length > 100 ? '...' : '') : 'N/A'}\n\n`;
        });
        
        await conn.sendMessage(m.chat, { text: caption, mentions: [m.sender] }, { quoted: m });
        
    } catch (e) {
        console.log(e);
        throw eror;
    }
};

handler.help = ['douyins <query>'];
handler.tags = ['tools'];
handler.command = /^(douyins|douyinsearch)$/i;
handler.limit = true;

export default handler;
