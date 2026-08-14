let handler: WaPlugin = async (m, { conn }) => {
    conn.merdeka = conn.merdeka ? conn.merdeka : {}
    let id = m.chat
    if (!(id in conn.merdeka)) throw false
    let json = conn.merdeka[id][1]
    let ans = json.jawaban
    // If the clue leaves letters unmasked, uppercase the answer to match the letters in the regex below
    let clue = ans.replace(/[BCDFGHJKLMNPQERSVWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^mka/i
handler.limit = true
export default handler