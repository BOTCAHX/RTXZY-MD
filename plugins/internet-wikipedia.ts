import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh: ${usedPrefix + command} pohon`;
    
    try {
        await m.reply(wait);
        let response = await fetch(`https://api.botcahx.eu.org/api/search/wikipedia?text=${encodeURIComponent(text)}&apikey=${btc}`);
        let data = await response.json();
        
        if (!data.result) throw 'Tidak ada hasil ditemukan';
        
        let caption = `📖 WIKIPEDIA SEARCH\n\n` +
                     `📌 Judul: ${data.result.title}\n` +
                     `📄 Isi:\n${data.result.isi.slice(0, 1000)}${data.result.isi.length > 1000 ? '...' : ''}\n\n` +
                     `🔗 Sumber: Wikimedia Commons\n` +
                     `🖼️ Thumbnail: ${data.result.thumb || 'Tidak tersedia'}`;
        
        if (data.result.thumb) {
            let img = await (await fetch(data.result.thumb)).buffer();
            await conn.sendMessage(m.chat, {
                image: img,
                caption: caption
            }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, {
                text: caption
            }, { quoted: m });
        }
        
    } catch (e) {
        throw eror;
    }
};

handler.tags = ['internet'];
handler.help = ['wikipedia <kata kunci>'];
handler.command = /^(wikipedia|wiki)$/i;
handler.limit = true;

export default handler;
