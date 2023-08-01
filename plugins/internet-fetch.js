//boleh dicopy kak hehe:v
// wm © BOTCAHX jangan di ilangin

const axios = require('axios');
let handler = async (m, { text, args }) => {
  if (!/^https?:\/\//.test(text)) throw 'Awali *URL* dengan http:// atau https://';
  try {
    const fetch = await axios.get(args[0], {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Referer": args[0],
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
      }
    });
    const size = fetch.headers['content-length'] ? formatSize(fetch.headers['content-length']) : '1 KB';
    const chSize = sizeLimit(size, '200');
    if (chSize.oversize) return conn.reply(m.chat, ` 🚩 File size (${size}) exceeds the maximum limit, we can't download the file.`, m);
    if (/json/i.test(fetch.headers['content-type'])) return m.reply(jsonFormat(fetch.data));
    if (/text/i.test(fetch.headers['content-type'])) return m.reply(fetch.data);
    conn.sendFile(m.chat, args[0], '', '', m);
  } catch (e) {
    console.log(e);
    return conn.reply(m.chat, e.message, m);
  }
};

handler.help = ['fetch', 'get'].map(v => v + ' <url>');
handler.tags = ['internet'];
handler.command = /^(fetch|get)$/i;

module.exports = handler;
function formatSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function sizeLimit(size, limit) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const limitSize = parseFloat(limit);
  const limitUnit = limit.replace(/[\d.]/g, '');
  const limitIndex = sizes.findIndex(unit => unit === limitUnit);
  const currentSize = parseFloat(size);
  const currentUnit = size.replace(/[\d.]/g, '');
  const currentIndex = sizes.findIndex(unit => unit === currentUnit);

  if (currentIndex > limitIndex) {
    return {
      oversize: true,
      currentSize: currentSize,
      currentUnit: currentUnit,
      limitSize: limitSize,
      limitUnit: limitUnit
    };
  } else {
    return {
      oversize: false,
      currentSize: currentSize,
      currentUnit: currentUnit,
      limitSize: limitSize,
      limitUnit: limitUnit
    };
  }
}

function jsonFormat(json) {
  return JSON.stringify(json, null, 2);
}

