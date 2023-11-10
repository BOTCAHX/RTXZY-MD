let ytdl = require('ytdl-core');
let fs = require('fs');
let ffmpeg = require('fluent-ffmpeg');
let search = require ('yt-search');

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('Example: *${usedPrefix + command}* https://youtube.com/watch?v=vG5xyd5wufY');
  const isValid = await ytdl.validateURL(text);
    if (!isValid) {
        return m.reply("*your link not suported.*");
    }
  try {
    let info = await ytdl.getInfo(text);
    let videoId = info.videoDetails.videoId;
    let title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let url = info.videoDetails.video_url;
    let duration = parseInt(info.videoDetails.lengthSeconds);
    let uploadDate = new Date(info.videoDetails.publishDate).toLocaleDateString();
    let views = info.videoDetails.viewCount;
    let minutes = Math.floor(duration / 60);
    let description = info.videoDetails.shortDescription;
    let seconds = duration % 60;
    let durationText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;       
    let audio = ytdl(text, { quality: 'highestaudio' });
    let inputFilePath = 'tmp/' + title + '.webm';
    let outputFilePath = 'tmp/' + title + '.mp3';
    let viewsFormatted = formatViews(views);
    let infoText = `◦ *Title*: ${title}\n◦ *Duration*: ${durationText}\n◦ *Upload*: ${uploadDate}\n◦ *Views*: ${viewsFormatted}\n◦ *ID*: ${videoId}\n◦ *Description*: ${description}
  `;
    const pesan = conn.relayMessage(m.chat, {
                extendedTextMessage:{
                text: infoText, 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        body: "",
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url
                    }
                }, mentions: [m.sender]
}}, {});

    audio.pipe(fs.createWriteStream(inputFilePath)).on('finish', async () => {
      ffmpeg(inputFilePath)
        .toFormat('mp3')
        .on('end', async () => {
          let thumbnailData = await conn.getFile(thumbnailUrl);
          let buffer = fs.readFileSync(outputFilePath);
          conn.sendMessage(m.chat, {         
                audio: buffer,
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "",
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .on('error', (err) => {
          console.log(err);
          conn.sendMessage(m.chat, {         
                document: buffer,
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: title,
                        body: "",
                        thumbnailUrl: thumbnailUrl,
                        sourceUrl: url,
                        mediaType: 1,
                        showAdAttribution: true,
                        renderLargerThumbnail: true
                    }
                }
            }, {
                quoted: m
            });
          fs.unlinkSync(inputFilePath);
          fs.unlinkSync(outputFilePath);
        })
        .save(outputFilePath);
    });
  } catch (e) {
    console.log(e);
    m.reply(`An error : ${e.message}`);
  }
};

handler.command = handler.help = ['ds', 'ytmp3', 'yta'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = 5;

module.exports = handler

function formatViews(views) {
  if (views >= 1000000) {
    return (views / 1000000).toFixed(1) + 'M';
  } else if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'K';
  } else {
    return views.toString();
  }
}
