var handler = async(m,{ conn }) => {
var indo = 'https://api.botcahx.xyz/api/indonesia/china?apikey=Admin'
conn.sendButtonImg(m.chat, indo, `Indonesian Girls`, wm, 'Next', '.cecanindonesia', m) 
};
handler.command = handler.help = ['cecanindonesia'];
handler.tags = ['asupan'];
module.exports = handler;
