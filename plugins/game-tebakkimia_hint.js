let handler = async (m, { conn }) => {
    conn.tebakkimia = conn.tebakkimia ? conn.tebakkimia : {}
    let id = m.chat
    if (!(id in conn.tebakkimia)) throw false
    let json = conn.tebakkimia[id][1]
    conn.reply(m.chat, '```' + json.bantuan + '```\nBalas soalnya, bukan pesan ini!', conn.tebakkimia[id][0])
}
handler.command = /^teki$/i

handler.limit = 1

module.exports = handler