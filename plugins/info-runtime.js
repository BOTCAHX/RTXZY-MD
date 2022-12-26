var handler = async (m, { 
conn, 
usedPrefix,
command
}) => {
    var _uptime = process.uptime() * 1000
    var uptimer = clockString(_uptime)
    var time = require('moment-timezone').tz('Asia/Jakarta').format('HH:mm:ss')

m.reply(`
*───「 RUNTIME BOT 」───*

Runtime : ${uptimer} 
Waktu : ${time}`)
};
handler.command = handler.help = ['runtime', 'uptime'];
handler.tags = ['info'];
module.exports = handler;
function clockString(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " D " + hours + " H " + M + " Minute " + S + " Second ";
}
