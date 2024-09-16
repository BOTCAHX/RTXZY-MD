let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Gunakan contoh: ${usedPrefix}${command} semarang`;
    
    try {
        const res = await (await fetch(`https://api.botcahx.eu.org/api/tools/jadwalshalat?kota=${text}&apikey=${btc}`)).json();
        
        if (!res.status || res.result.code !== 200) {
            throw eror
        }
        
        let timings = res.result.data[0].timings;
        let jadwalSholat = Object.entries(timings)
            .map(([name, time]) => `*${name}:* ${time}`)
            .join('\n');
        
        let message = `
Jadwal Sholat untuk *${text}*
${jadwalSholat}
`.trim();
        
        m.reply(message);
    } catch (error) {
        throw eror
    }
};

handler.help = ['salat <daerah>'];
handler.tags = ['islam'];
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i;
handler.limit = true;

module.exports = handler;
