let handler: WaPlugin = async (m, { conn }) => {
    conn.fisika = conn.fisika ? conn.fisika : {}
    let id = m.chat
    if (!(id in conn.fisika)) throw false
    let json = conn.fisika[id][1]
    let ans = json.jawaban
    // If the clue shows unmasked letters, lowercase the answer so consonants get replaced with (_)
    let clue = ans.replace(/[bcdfghjklmnpqrstvwxyz123456789]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^fska/i
handler.limit = true
export default handler