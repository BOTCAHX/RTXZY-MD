let handler: WaPlugin = async (m, { conn }) => {
    conn.tbkata = conn.tbkata ? conn.tbkata : {}
    let id = m.chat
    if (!(id in conn.tbkata)) throw false
    let json = conn.tbkata[id][1]
    let ans = json.jawaban
    // If the clue shows underscores, lowercase the regex string in the function below
    let clue = ans.replace(/[BCDFGHJKLMNPQRSTFWXYZ]/g, '_')
    m.reply('```' + clue + '```')
}
handler.command = /^tkaa/i
handler.limit = true
export default handler
