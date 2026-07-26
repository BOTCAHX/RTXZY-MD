let handler = async (m, { conn }) => {
    conn.tebakgenshin = conn.tebakgenshin ? conn.tebakgenshin : {}
    let id = m.chat
    if (!(id in conn.tebakgenshin)) throw false
    let json = conn.tebakgenshin[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^gca$/i

handler.limit = true

export default handler
