let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakdrakor = conn.tebakdrakor ? conn.tebakdrakor : {}
    let id = m.chat
    if (!(id in conn.tebakdrakor)) throw false
    let json = conn.tebakdrakor[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tdkt$/i

handler.limit = true

export default handler