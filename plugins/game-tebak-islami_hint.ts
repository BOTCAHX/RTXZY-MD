let handler: WaPlugin = async (m, { conn }) => {
    conn.tebakislami = conn.tebakislami ? conn.tebakislami : {}
    let id = m.chat
    if (!(id in conn.tebakislami)) throw false
    let json = conn.tebakislami[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tsa/i
handler.limit = true
export default handler
