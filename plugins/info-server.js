const os = require('node:os');
const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
let format = await fetch('https://ip-json.vercel.app/')
    .then(res => res.json())
    .then(json => {
        delete json.status;
        let caption = `乂  *S E R V E R*\n\n`;
        caption += `┌  ◦  OS : ${os.type()} (${os.arch()} / ${os.release()})\n`;
        caption += `│  ◦  Ram : ${formatSize(process.memoryUsage().rss)} / ${formatSize(os.totalmem())}\n`;
        for (let key in json.result) caption += `│  ◦  ${ucword(key)} : ${json.result[key]}\n`;
        caption += `│  ◦  Uptime : ${toTime(os.uptime() * 1000)}\n`;
        caption += `└  ◦  Processor : ${os.cpus()[0].model}\n\n`;
      conn.relayMessage(m.chat, {
      extendedTextMessage: {
      text: caption, 
      contextInfo: {
        externalAdReply: {
          title: `${toTime(os.uptime() * 1000)}`,
          mediaType: 1,
          previewType: 0,
          renderLargerThumbnail: true,
          thumbnailUrl: 'https://telegra.ph/file/cf4f28ed3b9ebdfb30adc.png',
          sourceUrl: ''
        }
      },
      mentions: [m.sender]
    }
  }, {})
        deleteMessage();
    })
    .catch(error => {
        console.log(error);
        deleteMessage();
    });
};

handler.command = handler.help = ['server']
handler.tags = ['info']
module.exports = handler;

function deleteMessage() {
//chaunima😁   
}

function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function ucword(str) {
    return str.replace(/\b\w/g, function(l) {
        return l.toUpperCase();
    });
}

function toTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    return `${days} days, ${hours % 24} hours, ${minutes % 60} minutes, ${seconds % 60} seconds`;
  }
