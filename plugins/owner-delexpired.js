let handler = async (m, { conn, args, usedPrefix, command }) => {
    
    let who
    if (m.isGroup) who = args[0] ? args[0] : m.chat
    else who = args[0]

    if (new Date() * 1 < global.db.data.chats[who].expired) global.db.data.chats[who].expired = false
    else global.db.data.chats[who].expired = false
    conn.reply(m.chat, `Berhasil menghapus hari kadaluarsa untuk Grup ini`, m)
}
handler.help = ['delesewa']
handler.tags = ['owner']
handler.command = /^(delexpired|delsewa)$/i
handler.rowner = true

export default handler

function msToDate(ms) {
    let temp = ms
    let days = Math.floor(ms / (24 * 60 * 60 * 1000));
    let daysms = ms % (24 * 60 * 60 * 1000);
    let hours = Math.floor((daysms) / (60 * 60 * 1000));
    let hoursms = ms % (60 * 60 * 1000);
    let minutes = Math.floor((hoursms) / (60 * 1000));
    let minutesms = ms % (60 * 1000);
    let sec = Math.floor((minutesms) / (1000));
    return days + " hari " + hours + " jam " + minutes + " menit";
    // +minutes+":"+sec;
}
