let handler: WaPlugin = async (m, { conn }) => {
    conn.susun = conn.susun ? conn.susun : {}
    let id = m.chat
    if (!(id in conn.susun)) throw false
    let json = conn.susun[id][1]
    let ans = json.jawaban
    // If the clue shows unmasked letters, lowercase the answer so consonants get replaced with (_)
    let clue = ans.replace(/[AIUEOaiueo]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^susn/i
handler.limit = true
export default handler