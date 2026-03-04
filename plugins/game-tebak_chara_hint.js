let handler = async (m, { conn }) => {
    conn.tebakchara = conn.tebakchara ? conn.tebakchara : {}
    let id = m.chat
    if (!(id in conn.tebakchara)) throw false
    let json = conn.tebakchara[id][1]
    m.reply('```' + json.result.name.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^chrd$/i;

handler.limit = true

module.exports = handler