let handler = async (m, { conn }) => {
    conn.tebaktempat = conn.tebaktempat ? conn.tebaktempat : {}
    let id = m.chat
    if (!(id in conn.tebaktempat)) throw false
    let json = conn.tebaktempat[id][1]
    let ans = json.jawaban
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/gi, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tpc/i
handler.limit = true
export default handler
