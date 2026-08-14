let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakpokemon = conn.tebakpokemon ? conn.tebakpokemon : {}
    let id = m.chat
    if (!(id in conn.tebakpokemon)) throw false
    let json = conn.tebakpokemon[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^tebpo$/i

handler.limit = true

export default handler