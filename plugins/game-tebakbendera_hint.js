let handler = async (m, { conn }) => {
    conn.tebakbendera = conn.tebakbendera ? conn.tebakbendera : {}
    let id = m.chat
    if (!(id in conn.tebakbendera)) throw false
    let json = conn.tebakbendera[id][1]
    m.reply('```' + json.name.replace(/[bcdfghjklmnpqrstvwxyz]/g, '_') + '```\nBalas soalnya Bukan Pesan ini_-')
}
handler.command = /^tebe$/i
handler.limit = true
module.exports = handler
