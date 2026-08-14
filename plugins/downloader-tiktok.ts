import axios from 'axios';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vt.tiktok.com/ZSkGPK9Kj/`;    
    try {
        if (!text.match(/tiktok/gi) && !text.match(/douyin/gi)) {
          throw `URL Tidak Ditemukan!`;
        }
        m.reply(wait);      

        try {
            const response = await axios.get(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${text}&apikey=${btc}`);
            const res = response.data.result;      
            var { video, title, title_audio, audio } = res;
            if (!video[0]) {
                throw eror
            }
            let capt = `乂 *T I K T O K*\n\n`;
            capt += `◦ *Title* : ${title}\n`;
            capt += `\n`;   
                 
            if (video.length > 1) {
                for (let v of video) {
                    await conn.sendFile(m.chat, v, null, capt, m);
                }
            } else {
                await conn.sendFile(m.chat, video[0], null, capt, m);
            }

            if (!audio[0]) {
                await conn.reply(m.chat, "_Audio tidak tersedia!_", m);
            } else {
                conn.sendMessage(m.chat, { audio: { url: audio[0] }, mimetype: 'audio/mpeg' }, { quoted: m });
            }
            return;
        } catch (e) {
            throw eror;
        }
    } catch (e) {
        throw eror;
    }
};

handler.help = ['tiktok'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

export default handler;
