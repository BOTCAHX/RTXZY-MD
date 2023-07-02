const axios = require('axios');
const cheerio = require('cheerio');
let handler = async(m, { conn }) => {
m.reply(wait)
axios.get('https://www.sotwe.com/sayacewek18')
  .then((response) => {
    const $ = cheerio.load(response.data);
    const videoSrcArray = $('video > source').map(function() {
      return $(this).attr('src');
    }).get();
    const randomVideoSrc = videoSrcArray[Math.floor(Math.random() * videoSrcArray.length)];
    const title = 'bkptwit';
    const caption = 'Enjoy this random video!';
    const mimeType = '';
    conn.sendFile(m.chat, randomVideoSrc, title, caption, m, false, {mimetype: mimeType});
  })
}
handler.help = ['bkp']
handler.tags = ['downloader']
handler.command = /^bkp$/i
handler.owner = false
handler.premium = true
handler.group = false
handler.private = false

module.exports = handler
