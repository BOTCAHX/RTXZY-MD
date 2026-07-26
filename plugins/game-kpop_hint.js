let handler = async (m, { conn }) => {
    conn.tebakkpop = conn.tebakkpop ? conn.tebakkpop : {}
    let id = m.chat
    if (!(id in conn.tebakkpop)) throw false
    let json = conn.tebakkpop[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^kpp$/i

handler.limit = true

export default handler