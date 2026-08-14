let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakff = conn.tebakff ? conn.tebakff : {}
    let id = m.chat
    if (!(id in conn.tebakff)) throw false
    let json = conn.tebakff[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tbff$/i

handler.limit = true

export default handler