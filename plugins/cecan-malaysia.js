var handler = async(m,{ conn }) => {
var upin = 'https://api.botcahx.xyz/api/cecan/malaysia?apikey=Admin'
conn.sendButtonImg(m.chat, upin, `Malaysia Girls`, wm, 'Next', '.cecanmalaysia', m) 
};
handler.command = handler.help = ['cecanmalaysia'];
handler.tags = ['asupan'];
module.exports = handler;
