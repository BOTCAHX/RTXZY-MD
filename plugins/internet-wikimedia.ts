import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Contoh: ${usedPrefix + command} pohon`;
    
    try {
        await m.reply(wait);
        let response = await fetch(`https://api.botcahx.eu.org/api/search/wikimedia?text1=${encodeURIComponent(text)}&apikey=${btc}`);
        let data = await response.json();
        
        if (!data.result || data.result.length === 0) throw 'Tidak ada gambar ditemukan';
        
        let image = data.result[Math.floor(Math.random() * data.result.length)];
        let img = await (await fetch(image.image)).buffer();
        
        let caption = `📷 WIKIMEDIA SEARCH\n\n` +
                     `📌 Kata Kunci: ${text}\n` +
                     `📄 Judul: ${image.title || 'Tidak tersedia'}\n` +
                     `🔗 Sumber: ${image.source || 'Tidak tersedia'}\n` +
                     `📊 Total Ditemukan: ${data.result.length} gambar\n\n` +
                     `✨ Gambar random dari hasil pencarian!`;
        
        await conn.sendMessage(m.chat, {
            image: img,
            caption: caption
        }, { quoted: m });
        
    } catch (e) {
        throw eror;
    }
};

handler.tags = ['internet'];
handler.help = ['wikimedia <kata kunci>'];
handler.command = /^(wikimedia)$/i;
handler.limit = true;

export default handler;
