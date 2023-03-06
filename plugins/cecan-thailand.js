var handler = async(m,{ conn }) => {
var wikwik = 'https://api.botcahx.xyz/api/cecan/thailand?apikey=Admin'
conn.sendButtonImg(m.chat, wikwik, `Thailand Girls`, wm, 'Next', '.cecanthailand', m) 
};
handler.command = handler.help = ['cecanthailand'];
handler.tags = ['asupan'];
module.exports = handler;
