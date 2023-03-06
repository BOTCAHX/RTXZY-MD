var handler = async(m,{ conn }) => {
var nguyen = 'https://api.botcahx.xyz/api/cecan/vietnam?apikey=Admin'
conn.sendButtonImg(m.chat, nguyen, `Vietnam Girls`, wm, 'Next', '.cecanvietname', m) 
};
handler.command = handler.help = ['cecanvietname'];
handler.tags = ['asupan'];
module.exports = handler;
