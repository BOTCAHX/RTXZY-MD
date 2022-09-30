let handler = async (m, { conn }) => {
    conn.tebakkabupaten = conn.tebakkabupaten ? conn.tebakkabupaten : {}
    let id = m.chat
    if (!(id in conn.tebakkabupaten)) throw false
    let json = conn.tebakkabupaten[id][1]
    conn.reply(m.chat, '```' + json.title.replace(/[AIUEOaiueo]/g, '_') + '```\nBalas gambarnya, bukan pesan ini', conn.tebakkabupaten[id][0])
}
handler.command = /^tebu$/i

module.exports = handler
