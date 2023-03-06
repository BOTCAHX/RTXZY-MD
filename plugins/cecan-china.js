var handler = async(m,{ conn }) => {
var bingciling = 'https://api.botcahx.xyz/api/cecan/china?apikey=Admin'
conn.sendButtonImg(m.chat, bingciling, `Chinese Girls`, wm, 'Next', '.cecanchina', m) 
};
handler.command = handler.help = ['cecanchina'];
handler.tags = ['asupan'];
module.exports = handler;
