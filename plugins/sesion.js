var fs = require('fs')
var handler = async (m, {
 conn,
 text
 }) => {
    m.reply('Tunggu Sebentar, Proses Getting File creds.json')
    let sesi = await fs.readFileSync('./sessions/creds.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'creds.json' }, { quoted: m })
}
handler.command = handler.help = ['getsesi', 'getcreds', 'getsessions'];
handler.tags = ['internet'];
handler.rowner = true;
module.exports = handler;
