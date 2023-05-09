var fetch = require("node-fetch");
let handler = async (m, { 
conn, 
args 
}) => {
   response = args.join(' ').split('|')
  if (!args[0]) throw 'Masukkan Text\nContoh : .nekogirl BOTCAHX'
  m.reply('_Proses..._')
  var tio = `https://oni-chan.my.id/api/canvas/nekogirl1?text1=${response[0]}&text2=${response[1]}`
  conn.sendFile(m.chat, tio, 'ffff.jpg', wm, m, false)
};
handler.command = handler.help = ['nekogirl'];
handler.tags = ['maker'];
module.exports = handler;