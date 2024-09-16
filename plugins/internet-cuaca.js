const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
    if (!text) throw `Penggunaan:\n${usedPrefix + command} <teks>\n\nContoh:\n${usedPrefix + command} Jakarta`;
    try {
        let res = await fetch(`https://api.botcahx.eu.org/api/tools/cuaca?query=${encodeURIComponent(text)}&apikey=${btc}`);
        if (!res.ok) throw 'Lokasi tidak ditemukan';
        let json = await res.json();
        if (!json.status || json.code !== 200) throw eror;
        let result = json.result;
        m.reply(`Lokasi: ${result.location}\nNegara: ${result.country}\nCuaca: ${result.weather}\nSuhu saat ini: ${result.currentTemp}\nSuhu tertinggi: ${result.maxTemp}\nSuhu terendah: ${result.minTemp}\nKelembapan: ${result.humidity}\nAngin: ${result.windSpeed}`);
    } catch (error) {
        m.reply('Terjadi error saat mencari informasi cuaca, silakan coba lagi nanti');
    }
};

handler.help = ['cuaca'];
handler.tags = ['internet'];
handler.command = /^(cuaca|weather)$/i;

module.exports = handler;
