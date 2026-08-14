import fetch from 'node-fetch';

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `🚩 *Example:* ${usedPrefix + command} https://t.me/addstickers/fuwayonimaa_by_fStikBot`;
    if (!text.match(/(https:\/\/t.me\/addstickers\/)/gi)) throw `🚩 *Example:* ${usedPrefix + command} https://t.me/addstickers/fuwayonimaa_by_fStikBot`;
    m.reply(wait)
    try {
        let res = await (await fetch(`https://api.botcahx.eu.org/api/download/telesticker?url=${text}&apikey=${btc}`)).json()
        let { result } = res;
        let total = result.length;
        let est = total * 0.5;
        m.reply(`Processing ${total} stickers`);   
        for (var i = 0; i < result.length; i++) {
            var url = result[i].url;
            await sleep(10000)
            await conn.sendImageAsSticker(m.chat, url, null, { packname: global.packname, author: global.author });
        }  
        await conn.reply(m.chat, `Total ${total} stickers successfully sent`, m);
    } catch (e) {
        throw `🚩 ${eror}`
    }
};

handler.help = ['telesticker'];
handler.command = /^(telesticker|stele)$/i;
handler.tags = ['sticker'];
handler.premium = true;
handler.limit = true;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
