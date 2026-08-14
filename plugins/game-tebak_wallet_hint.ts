let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakwallet = conn.tebakwallet ? conn.tebakwallet : {}
    let id = m.chat
    if (!(id in conn.tebakwallet)) throw false
    let json = conn.tebakwallet[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^twa$/i

handler.limit = true

export default handler
