var fetch = require("node-fetch");
var handler = async (m, { conn, args, usedPrefix, command }) => {
if (!args[0])
      throw `Masukan URL!\n\ncontoh:\n${usedPrefix + command} https://vm.tiktok.com/ZGJAmhSrp/`;
    if (!args[0].match(/tiktok/gi))
      throw `URL Tidak Ditemukan!`;
  try {
    m.reply('*Please wait..*');
    var get = await fetch(
      `https://api.botcahx.biz.id/api/dowloader/tikok?url=${
        args[0]
      }&apikey=Admin`
    );
    if (!get.ok) throw await get.text();
    var convert = await get.json();
    if (!convert.status) throw convert;
    var { video, video2, username, description, audio } = convert.result;
    conn.sendFile(
      m.chat,
      video,
      'tiktok.mp4',
      `*Deskripsi*: ${description}\n*Username*: ${username}`,
      m
    );
  } catch (e) {
    console.log(e);
    if (m.sender) {
      conn.reply(m.chat, `_*Terjadi kesalahan!*_`, m);
    }
  }
};
handler.help = ['tiktok'];
handler.command = /^(tiktok|ttdl|tiktokdl|tiktoknowm|tt|tiktod|dltt)$/i;
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
