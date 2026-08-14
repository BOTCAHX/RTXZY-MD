import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, args, usedPrefix, command }) => {  
    if (!args[0]) throw `Gunakan contoh ${usedPrefix}${command} https://www.facebook.com/watch/?v=1393572814172251`;
    try {
        await m.reply(wait)
        const res = await fetch(`https://api.botcahx.eu.org/api/dowloader/fbdown3?url=${args[0]}&apikey=${btc}`);
        const json = await res.json();
        let urls = json.result.url.urls;
        if (!Array.isArray(urls)) {
            throw `Tidak dapat mendapatkan URL video dari tautan yang diberikan`;
        }
        for (let url of urls) {
            if (url.sd) {
                conn.sendFile(m.chat, url.sd, 'fb.mp4', `*Facebook Downloader*`, m);
                return;
            } else if (url.hd) {
                conn.sendFile(m.chat, url.hd, 'fb.mp4', `*Facebook Downloader*`, m);
                return;
            }
        }
        throw `Tidak ditemukan URL video SD atau HD`;
    } catch (error) {
        console.log(error);
        throw 'Terjadi kesalahan pada saat melakukan proses download';
    }
}
handler.help = ['facebook'].map(v => v + ' <url>');
handler.command = /^(fb|facebook|facebookdl|fbdl|fbdown|dlfb)$/i;
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
