let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakbola = conn.tebakbola ? conn.tebakbola : {}
    let id = m.chat
    if (!(id in conn.tebakbola)) throw false
    let json = conn.tebakbola[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tboa$/i

handler.limit = true

export default handler
