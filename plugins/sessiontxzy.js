let fs = require('fs')
let handler = async (m, { conn, text }) => {
    m.reply('Tunggu Sebentar, Proses Getting File sessiontxzy.data.json')
    let sesi = await fs.readFileSync('./sessiontxzy.data.json')
    return await conn.sendMessage(m.chat, { document: sesi, mimetype: 'application/json', fileName: 'sessiontxzy.data.json' }, { quoted: m })
}
handler.help = ['getsessi']
handler.tags = ['internet']
handler.command = /^(g(et)?ses?si(on)?(data.json)?)$/i

handler.rowner = true

module.exports = handler
