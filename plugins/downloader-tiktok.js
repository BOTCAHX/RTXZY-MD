const https = require('https');

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) {
      throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`
    }
try {
    if (!args[0].match(/tiktok/gi)) {
      throw `URL Tidak Ditemukan!`
    }
    m.reply('*Mohon tunggu..*')
    const api = await https.get(`https://api.botcahx.eu.org/api/dowloader/tiktok?url=${args[0]}&apikey=${btc}`, response => {
      let data = '';
      response.on('data', chunk => {
        data += chunk;
      });
      response.on('end', async () => {
        const res = JSON.parse(data);
        var { 
          video, 
          title, 
          title_audio,
          audio
        } = res.result
        await conn.sendFile(m.chat, video, null, `Title: ${title}\nDeskripsi: ${title_audio}\nAudio: ${audio[1]}`, m);
          conn.sendMessage(m.chat, { audio: { url: audio[1] }, mimetype: 'audio/mpeg' }, { quoted: m });
      });
    }).on('error', error => {
      console.log(error);
      throw error.message
    });
  } catch (e) {
    console.log(e)
    throw `Terjadi Kesalahan!`
  }
};

handler.help = ['tiktok'];
handler.command = /^(tiktok|tt|tiktokdl|tiktoknowm)$/i
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;

module.exports = handler;
