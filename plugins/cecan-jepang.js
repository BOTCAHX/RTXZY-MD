var handler = async(m,{ conn }) => {
var kimochi = 'https://api.botcahx.xyz/api/cecan/japan?apikey=Admin'
conn.sendButtonImg(m.chat, kimochi, `Japan Girls`, wm, 'Next', '.cecanjapan', m) 
};
handler.command = handler.help = ['cecanjapan'];
handler.tags = ['asupan'];
module.exports = handler;
