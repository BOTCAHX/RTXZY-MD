var fetch = require('node-fetch');
var handler = async (m, { 
conn, 
args 
}) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Text\nContoh : . harrypoter BOTCAHX'
  m.reply('_Proses..._')
  var res = `https://api.botcahx.biz.id/api/photooxy/harry-potter?text=${response[0]}&apikey=Admin`
  conn.sendFile(m.chat, res, 'botcahx.jpg', `© BOTCAHX`, m, false)
}
handler.help = ['harrypoter'].map(v => v + ' <text>')
handler.tags = ['photooxy'];
handler.command = /^(harrypoter)$/i
handler.limit = true;
module.exports = handler;
