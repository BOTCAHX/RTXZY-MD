let handler = async (m, { conn }) => {
    conn.tebaksholawat = conn.tebaksholawat ? conn.tebaksholawat : {}
    let id = m.chat
    if (!(id in conn.tebaksholawat)) throw false
    let json = conn.tebaksholawat[id][1]
    conn.reply(m.chat, '```' + json.bantuan + '```\nBalas soalnya, bukan pesan ini atau audionya!', conn.tebaksholawat[id][0])
}
handler.command = /^shola$/i

handler.limit = 1

module.exports = handler
