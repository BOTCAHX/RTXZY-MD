 const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
  let res = await fetch(`https://api.botcahx.eu.org/api/random/taugasih?apikey=${btc}`).then(result => result.json());
  conn.reply(m.chat, `“${res.taugasih}”`, m);
};

handler.help = ['taugasih'];
handler.tags = ['fun'];
handler.command = /^(taugasih)$/i;
handler.limit = true;
handler.admin = false;
handler.fail = null;

module.exports = handler;
