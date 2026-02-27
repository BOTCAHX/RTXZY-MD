let handler = async (m, { conn }) => {
    conn.tebakbuah = conn.tebakbuah ? conn.tebakbuah : {}
    let id = m.chat
    if (!(id in conn.tebakbuah)) throw false
    let json = conn.tebakbuah[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tbau$/i

handler.limit = true
    
module.exports = handler