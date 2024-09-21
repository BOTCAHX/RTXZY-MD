let fetch = require('node-fetch');

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) throw `Use example ${usedPrefix}${command} Minecraft`;  
    try {
    const res = await (await fetch(`https://api.botcahx.eu.org/api/search/googleimage?text1=${encodeURIComponent(text)}&apikey=${btc}`)).json();
    if (!res.status) throw eror
    let image = pickRandom(res.result).url;
    conn.sendFile(m.chat, image, 'google.jpg', `*G O O G L E*\n*Result:* ${text}\n*Source:* https://google.com`, m);
   } catch (e) {
   throw eror
  }
};

handler.help = ['gimage <query>', 'image <query>'];
handler.tags = ['internet'];
handler.command = /^(gimage|image)$/i;

module.exports = handler;

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
