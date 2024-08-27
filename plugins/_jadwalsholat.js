let fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Gunakan contoh: ${usedPrefix}${command} semarang`;
    
    try {
        const res = await (await fetch(`https://widipe.com/jadwalsholat?text=${text}`)).json();
        
        if (!res.status || !res.result || res.result.code !== 200) {
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
        console.error(error);
        m.reply('Terjadi kesalahan saat mengambil data jadwal sholat.');
    }
};

handler.help = ['salat <daerah>'];
handler.tags = ['islam'];
handler.command = /^(jadwal)?s(a|o|ha|ho)lat$/i;
handler.limit = true;

module.exports = handler;
