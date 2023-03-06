var handler = async(m,{ conn }) => {
var batues = 'https://api.botcahx.xyz/api/cecan/korea?apikey=Admin'
conn.sendButtonImg(m.chat, batues, `Plastic Girls`, wm, 'Next', '.cecankorea', m) 
};
handler.command = handler.help = ['cecankorea'];
handler.tags = ['asupan'];
module.exports = handler;
