import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn }) => {
    try {
        await m.reply(wait);
        let img = await (await fetch(`https://api.botcahx.eu.org/api/wallpaper/wallhp?apikey=${btc}`)).buffer();
        await conn.sendMessage(m.chat, {
            image: img,
            caption: 'Berikut adalah wallpaper random untuk Anda!'
        }, { quoted: m });
    } catch (e) {
        throw eror;
    }
};

handler.tags = ['internet'];
handler.help = ['wallpaper'];
handler.command = /^(wallpaper)$/i;
handler.limit = true;

export default handler;
