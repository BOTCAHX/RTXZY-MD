// jika menggunakan single sessions
Maka bisa menggunakan fitur ini //

var fs = require("fs");
var handler = async (m, {
 conn,
 text 
 }) => {
    m.reply('Tunggu Sebentar, Proses Getting File wamd.data.json')
    var sesi = await fs.readFileSync('./session.data.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'wamd.data.json' }, { quoted: m })
};
handler.help = ['getsessi'];
handler.tags = ['internet'];
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i
handler.rowner = true;
module.exports = handler;
