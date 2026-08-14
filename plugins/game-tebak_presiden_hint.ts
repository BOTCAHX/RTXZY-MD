let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakpresiden = conn.tebakpresiden ? conn.tebakpresiden : {}
    let id = m.chat
    if (!(id in conn.tebakpresiden)) throw false
    let json = conn.tebakpresiden[id][1]
    m.reply('```' + json.jawaban.replace(/[bcdfghjklmnpqrstvwxyz]/gi, '_') + '```\n*BALAS SOALNYA, BUKAN PESAN INI!*')
}
handler.command = /^pra$/i

handler.limit = true

export default handler
