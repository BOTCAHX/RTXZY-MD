let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakjkt = conn.tebakjkt ? conn.tebakjkt : {}
    let id = m.chat
    if (!(id in conn.tebakjkt)) throw false
    let json = conn.tebakjkt[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^jkcu$/i

handler.limit = true

export default handler