const ytdl = require('ytdl-core');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const handler = async (m, { conn, text, command, usedPrefix }) => {
  conn.ytmp3 = conn.ytmp3 || {};
  if (m.sender in conn.ytmp3) {
    return;
  }
  if (!text) throw `*Example:* ${usedPrefix + command} https://www.youtube.com/watch?v=Z28dtg_QmFw`
  conn.reply(m.chat, wait, m);
  conn.ytmp3[m.sender] = true;
  try {
    let audio = ytdl(text, { quality: 'highestaudio' });
    let inputFilePath = './tmp/music.webm';
    let outputFilePath = './tmp/music.mp3';
    audio.pipe(fs.createWriteStream(inputFilePath)).on('finish', async () => {
      ffmpeg(inputFilePath)
        .toFormat('mp3')
        .on('end', async () => {
          let buffer = fs.readFileSync(outputFilePath);
          conn.sendMessage(m.chat, { audio: buffer, mimetype: 'audio/mpeg' }, { quoted: m });
          delete conn.ytmp3[m.sender];
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on('error', (err) => {
          console.log(err);
          m.reply(`*Convert Error:* ${err.message}`);
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .save(outputFilePath);
    });
  } catch (e) {
    console.log(e);
    m.reply(`*Error:* ${e.message}`);
  }
};

handler.command = handler.help = ['ytmp3','yta'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
