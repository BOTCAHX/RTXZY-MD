let handler = async (m, { conn }) => {
    conn.tebakmakanan = conn.tebakmakanan ? conn.tebakmakanan : {}
    let id = m.chat
    if (!(id in conn.tebakmakanan)) throw false
    let json = conn.tebakmakanan[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tebma$/i

handler.limit = true

export default handler