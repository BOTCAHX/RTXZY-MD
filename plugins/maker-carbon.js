const carbon = require('carbon-now-scraper');
const fs = require('fs');
let handler = async (m, { conn, text, command}) => {

  let inputText = m.quoted ? m.quoted.text : text;
  if (!inputText) {
    return conn.reply(m.chat, `Masukkan pesan:\n${command} hello world`, m);
  }

  var randomColor = ['#ef1a11', '#89cff0', '#660000', '#87a96b', '#e9f6ff', '#ffe7f7', '#ca86b0', '#83a3ee', '#abcc88', '#80bd76', '#6a84bd', '#5d8d7f', '#530101', '#863434', '#013337', '#133700', '#2f3641', '#cc4291', '#7c4848', '#8a496b', '#722f37', '#0fc163', '#2f3641', '#e7a6cb', '#64c987', '#e6e6fa', '#ffffff', '#00000000'];
  const apiColor = randomColor[Math.floor(Math.random() * randomColor.length)];
  conn.reply(m.chat, '*Tunggu few seconds...*', m)

  const code = inputText
  const output = "./tmp/carbon.png"
  const options = {
    lang: "auto",
    theme: "dracula",
    background: apiColor,
    "width-adjustment": false
  }
  await carbon(code, output, options)
  await conn.sendMessage(m.chat, { image: await fs.readFileSync(output), caption: `*Done*`},{quoted:m})
}

handler.help = ['carbon'].map(v => v + ' <text>')
handler.tags = ['maker']
handler.command = /^(carbon)$/i

module.exports = handler
