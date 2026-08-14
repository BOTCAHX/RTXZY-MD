import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh: ${usedPrefix + command} game`;
    
    try {
        await m.reply(wait);
        let response = await fetch(`https://api.botcahx.eu.org/api/search/wallpaper?text1=${encodeURIComponent(text)}&apikey=${btc}`);
        let data = await response.json();
        
        if (!data.result || data.result.length === 0) throw 'Tidak ada wallpaper ditemukan';
        
        let wallpaper = data.result[Math.floor(Math.random() * data.result.length)];
        let img = await (await fetch(wallpaper.image)).buffer();
        
        let caption = `🎨 HASIL PENCARIAN WALLPAPER\n\n` +
                     `📌 Kata Kunci: ${text}\n` +
                     `🖼️ Tipe: ${wallpaper.type || 'Tidak diketahui'}\n` +
                     `📎 Sumber: ${wallpaper.source || 'Tidak tersedia'}\n` +
                     `📊 Total Ditemukan: ${data.result.length} wallpaper\n\n` +
                     `✨ Wallpaper random dari hasil pencarian!`;
        
        await conn.sendMessage(m.chat, {
            image: img,
            caption: caption
        }, { quoted: m });
        
    } catch (e) {
        throw eror;
    }
};

handler.tags = ['internet'];
handler.help = ['wallpapersearch <kata kunci>'];
handler.command = /^(wallpapersearch|wps)$/i;
handler.limit = true;

export default handler;
