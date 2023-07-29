const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    throw `Masukkan URL!\n\ncontoh:\n${usedPrefix + command} https://v.douyin.com/ikq8axJ/`;
  }
    if (!args[0].match(/douyin/gi)) {
      throw `URL Tidak Ditemukan!`;
    }
    m.reply('*Mohon tunggu...*');
    try {
    const api = await fetch(`https://api.botcahx.live/api/download/douyin?url=${args[0]}&apikey=${btc}`);
    const res = await api.json();
    var {
      title, 
      duration, 
      total_share,
      total_download,
      total_play,
      total_comment
    } = res.result.info_video
    const { 
    nowm,
    wm, 
    audio 
    } = res.result.url
     
  conn.sendFile(m.chat, nowm, null, `*Deskripsi:* ${title}\n*Durasi:* ${duration}\n*Total Share*: ${total_share}\n*Total Download:* ${total_download}\n*Total Play:* ${total_play}\n*Total Komentar:* ${total_comment}\n*Audio:* ${audio}`, m);
  } catch (e) {
    console.log(e);
    throw `Terjadi kesalahan!`;
  }
};
handler.help = ['douyin'];
handler.command = /^(douyin)$/i;
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
