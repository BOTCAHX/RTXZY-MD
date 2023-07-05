//boleh dicopy kak hehe:v
// wm © BOTCAHX 

const fetch = require('node-fetch');
const util = require('util');

let handler = async (m, { text }) => {
  if (!/^https?:\/\//.test(text)) throw 'Awali *URL* dengan http:// atau https://';
  const res = await fetch(text);
  if (res.headers.get('content-length') > 100 * 1024 * 1024 * 1024) {
    throw `Content-Length: ${res.headers.get('content-length')}`;
  }
  if (!/text|json/.test(res.headers.get('content-type'))) {
    return conn.sendFile(m.chat, text, 'file', text, m);
  }
  let txt = await res.buffer();
  try {
    txt = util.format(JSON.parse(txt + ''));
  } catch (e) {
    txt = txt + '';
  } finally {
    m.reply(txt.slice(0, 65536));
  }
};

handler.help = ['fetch', 'get'].map(v => v + ' <url>');
handler.tags = ['internet'];
handler.command = /^(fetch|get)$/i;

module.exports = handler;
