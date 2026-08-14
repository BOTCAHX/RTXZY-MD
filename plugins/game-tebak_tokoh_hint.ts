let handler: WaPlugin = async (m, { conn }) => {
    conn.tebaktokoh = conn.tebaktokoh ? conn.tebaktokoh : {}
    let id = m.chat
    if (!(id in conn.tebaktokoh)) throw false
    let json = conn.tebaktokoh[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tbok$/i

handler.limit = true

export default handler